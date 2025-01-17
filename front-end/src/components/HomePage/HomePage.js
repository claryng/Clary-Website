import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class HomePage extends BaseComponent {
    #container = null;
    #observer = null;
    #projects = [];

    constructor() {
        super();
        this.loadCSS("HomePage");
    }

    render() {
        if(this.#container) {
            return this.#container;
        }

        this.#projects = this.#getProjects('./components/HomePage/projects.csv');
        this.#createContainer();
        this.#initObserver();
        this.#subscribeToObserve();
        return this.#container;
    }

    #createContainer() {
        let welcomeSlide = this.#createWelcomeSlide();
        let projectSection = this.#addProject();
        this.#container = document.createElement('div');
        this.#container.setAttribute('id', 'homepage');
        this.#container.appendChild(welcomeSlide);
        this.#container.appendChild(projectSection);
    }

    #createWelcomeSlide() {
        const slideContainer = document.createElement('div');
        slideContainer.classList.add('slide-container');
        slideContainer.classList.add('welcome-slide');

        const welcomeTextBox = document.createElement('div');
        welcomeTextBox.classList.add('welcome-text-box');

        const welcomeText = document.createElement('h1');
        welcomeText.innerText = "Hi, I'm Clary";
        welcomeText.classList.add('welcome-text');
        welcomeText.classList.add('animate');

        const introduction = document.createElement('p');
        introduction.classList.add('introduction');
        introduction.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor convallis placerat. Etiam luctus sagittis diam eu vehicula. Curabitur velit nisl, elementum id odio dictum, faucibus tempus dolor. Nam imperdiet ac urna at fringilla. In pretium lacus erat, nec lobortis ipsum hendrerit eu. Morbi non lacus risus. Maecenas vel pulvinar.";
        introduction.classList.add('animate');

        welcomeTextBox.appendChild(welcomeText);
        welcomeTextBox.appendChild(introduction);
        slideContainer.appendChild(welcomeTextBox);

        const interactiveFigure = document.createElement('div');
        interactiveFigure.classList.add('interactive-figure');
        interactiveFigure.classList.add('animate');

        const spline3d = document.createElement('iframe');
        spline3d.setAttribute('src', 'https://my.spline.design/untitled-7e19e8abccace036ed843c404d3837a4/');
        spline3d.setAttribute('frameborder', 0);
        spline3d.setAttribute('id', 'spline');

        interactiveFigure.appendChild(spline3d);
        slideContainer.appendChild(interactiveFigure);

        return slideContainer;
    }

    #addProject() {
        const slideContainer = document.createElement('div');
        
        for(const pr of this.#projects) {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');
            
            const project = document.createElement('div');
            project.classList.add('project');
            
            const projectTitle = document.createElement('h2');
            projectTitle.classList.add('animate');
            projectTitle.classList.add('fade-in');

            if(pr.source !== 'N/A') {
                const link = document.createElement('a');
                link.setAttribute('href', pr.source);
                link.innerText = pr.title;
                projectTitle.appendChild(link);
            }else {
                projectTitle.innerText = pr.title;
            }
    
            const horizontalLine1 = document.createElement('div');
            const horizontalLine2 = document.createElement('div');
            horizontalLine1.classList.add('horizontal-line');
            horizontalLine1.classList.add('animate');
            horizontalLine2.classList.add('horizontal-line');
            horizontalLine2.classList.add('animate');
            
            const projectDescription = document.createElement('p');
            projectDescription.innerText = pr.description;
            projectDescription.classList.add('fade-in');
            projectDescription.classList.add('animate');
            
            const techStack = document.createElement('p');
            techStack.innerText = pr.tech;
            techStack.classList.add('fade-in');
            techStack.classList.add('animate');
            techStack.classList.add('tech-stack');
            
            project.appendChild(projectTitle);
            project.appendChild(horizontalLine1);
            project.appendChild(projectDescription);
            project.appendChild(horizontalLine2);
            project.appendChild(techStack);
            
            // Time
            const horizontalLine3 = document.createElement('div');
            horizontalLine3.classList.add('horizontal-line');
            horizontalLine3.classList.add('animate');
            horizontalLine3.classList.add('time-line');
            project.appendChild(horizontalLine3);
            const time = document.createElement('p');
            time.innerText = pr.time;
            time.classList.add('fade-in');
            time.classList.add('animate');
            time.classList.add('time');
            project.appendChild(time);

            // image/gif/video
            const illustration = document.createElement('div');
            illustration.classList.add('project-illustration');
            
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', pr.image);
            iframe.classList.add('fade-in');
            iframe.classList.add('animate');
            illustration.appendChild(iframe);

            projectContainer.appendChild(project);
            projectContainer.appendChild(illustration);

            slideContainer.appendChild(projectContainer);
        }
        
        return slideContainer;
    }

    #initObserver() {
        this.#observer = new IntersectionObserver(entries => {
            entries.forEach((entry) => {
                if(entry.target.querySelector('#spline') || entry.target.classList.contains('fade-in')) {
                    entry.target.classList.toggle('fade-in-animation', entry.isIntersecting);
                    entry.target.classList.toggle('fade-out-animation', !entry.isIntersecting);
                } else if(entry.target.classList.contains('horizontal-line')) {
                    entry.target.classList.toggle('show-up-animation', entry.isIntersecting);
                    entry.target.classList.toggle('disappear-animation', !entry.isIntersecting);
                } else {
                    entry.target.classList.toggle('slide-up-animation', entry.isIntersecting);
                }
            });
        });
    }

    #subscribeToObserve() {
        this.#container.querySelectorAll('.animate').forEach(target => {
            this.#observer.observe(target);
        });
    }

    #getProjects(file) {
        const reader = new XMLHttpRequest();
        const projects = [];
        reader.open("GET", file, false);
        reader.onreadystatechange = function() {

            // DONE
            if(reader.readyState === 4) {
                if(reader.status === 200 || reader.status === 0) { // DONE or OPENED
                    let data = reader.responseText;
                    data = data.trim();

                    // Extract all records
                    let quoted = false;
                    const records = [];
                    let record = '';
                    for(let i = 0; i < data.length; i++) {
                        let c = data[i];
                        if(quoted) {
                            record += c;
                            if(c == '"') {
                                quoted = false;
                            }
                        } else {
                            if(c == '\n') {
                                records.push(record.trim());
                                record = '';
                            }else {
                                record += c;
                                if(c == '"') {
                                    quoted = true;
                                }
                            }
                        }
                    }
                    records.push(record.trim());

                    // Create new entries in Project table with the extracted records
                    for(record of records) {
                        quoted = false;
                        let field = '';
                        const fields = [];
                        for(let i = 0; i < record.length; i++) {
                            let c = record[i];
                            if(quoted) {
                                if(c == '"') {
                                    quoted = false;
                                    c = '';
                                }
                                field += c;
                            }else {
                                if(c == ',') {
                                    fields.push(field.trim());
                                    field = '';
                                }else if(c == '"') {
                                    quoted = true;
                                }else {
                                    field += c;
                                }
                            }
                        }
                        fields.push(field.trim());
                        projects.push({
                            title: fields[0],
                            description: fields[1],
                            tech: fields[2],
                            time: fields[3],
                            image: fields[4],
                            source: fields[5]
                        });
                    }
                }
            }
        };
        reader.send(null);
        return projects.reverse();
    }
}
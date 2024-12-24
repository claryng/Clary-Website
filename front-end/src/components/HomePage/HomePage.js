import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class HomePage extends BaseComponent {
    #container = null;
    #observer = null;

    constructor() {
        super();
        this.loadCSS("HomePage");
    }

    render() {
        if(this.#container) {
            return this.#container;
        }

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
        slideContainer.classList.add('projects-section');

        const project = document.createElement('div');
        project.classList.add('project');
        project.classList.add('animate');

        const projectTitle = document.createElement('h2');
        projectTitle.innerText = "Project Title";

        const horizontalLine1 = document.createElement('hr');
        const horizontalLine2 = document.createElement('hr');

        const projectDescription = document.createElement('p');
        projectDescription.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor convallis placerat. Etiam luctus sagittis diam eu vehicula. Curabitur velit nisl, elementum id odio dictum, faucibus tempus dolor. Nam imperdiet ac urna at fringilla. In pretium lacus erat, nec lobortis ipsum hendrerit eu. Morbi non lacus risus. Maecenas vel pulvinar.";
        
        const techStack = document.createElement('p');
        techStack.innerText = "Tech: Lorem ipsum"

        project.appendChild(projectTitle);
        project.appendChild(horizontalLine1);
        project.appendChild(projectDescription);
        project.appendChild(horizontalLine2);
        project.appendChild(techStack);

        slideContainer.appendChild(project);

        // image/gif/video
        const illustration = document.createElement('div');
        illustration.classList.add('project-illustration');
        illustration.classList.add('animate');

        slideContainer.appendChild(illustration);
        
        return slideContainer;
    }

    #initObserver() {
        this.#observer = new IntersectionObserver(entries => {
            entries.forEach((entry) => {
                if(entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    if(entry.target.querySelector('#spline')) {
                        entry.target.classList.add('fade-in-animation');
                    } else {
                        entry.target.classList.add('slide-up-animation');
                    }
                    entry.target.classList.add('animated');
                } 
            });
        },
        {
            threshold: 0
        });
    }

    #subscribeToObserve() {
        this.#container.querySelectorAll('.animate').forEach(target => {
            this.#observer.observe(target);
        });
    }
}
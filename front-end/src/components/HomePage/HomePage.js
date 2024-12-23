import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class HomePage extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS("HomePage");
    }

    render() {
        if(this.#container) {
            return this.#container;
        }

        this.#createContainer();
        return this.#container;
    }

    #createContainer() {
        this.#container = this.#createWelcomeSlide();
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

        const introduction = document.createElement('p');
        introduction.classList.add('introduction');
        introduction.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor convallis placerat. Etiam luctus sagittis diam eu vehicula. Curabitur velit nisl, elementum id odio dictum, faucibus tempus dolor. Nam imperdiet ac urna at fringilla. In pretium lacus erat, nec lobortis ipsum hendrerit eu. Morbi non lacus risus. Maecenas vel pulvinar.";

        welcomeTextBox.appendChild(welcomeText);
        welcomeTextBox.appendChild(introduction);
        slideContainer.appendChild(welcomeTextBox);

        const interactiveFigure = document.createElement('div');
        interactiveFigure.classList.add('interactive-figure');

        const spline3d = document.createElement('iframe');
        spline3d.setAttribute('src', 'https://my.spline.design/untitled-7e19e8abccace036ed843c404d3837a4/');
        spline3d.setAttribute('frameborder', 0);
        spline3d.setAttribute('id', 'spline');

        interactiveFigure.appendChild(spline3d);
        slideContainer.appendChild(interactiveFigure);

        return slideContainer;
    }
}
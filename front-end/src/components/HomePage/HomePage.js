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

    }

    
}
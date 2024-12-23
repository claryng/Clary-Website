import { HomePage } from "../HomePage/HomePage.js";

export class AppControllerComponent {
    #homepage = null;

    constructor() {
        this.#homepage = new HomePage();
    }

    render() {
        return this.#homepage.render();
    }
}
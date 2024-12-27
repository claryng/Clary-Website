import ModelFactory from "../model/ModelFactory.js";

class ProjectController {
    constructor() {
        ModelFactory.getModel().then((model) => {
            this.model = model;
        });
    }
}

export default new ProjectController();
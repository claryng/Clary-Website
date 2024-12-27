import ModelFactory from "../model/ModelFactory.js";

class ProjectController {
    constructor() {
        ModelFactory.getModel('sqlite-fresh').then((model) => {
            this.model = model;
        });
    }
}

export default new ProjectController();
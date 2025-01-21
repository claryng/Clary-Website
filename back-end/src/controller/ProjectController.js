import ModelFactory from "../model/ModelFactory.js";

class ProjectController {
    constructor() {
        ModelFactory.getModel('sqlite-fresh').then((model) => {
            this.model = model;
        });
    }

    async getAllProjects(req, res) {
        try {
            const projects = await this.model.getAllProjects();
            return res.status(200).json({ projects });
        }catch (error) {
            return res.status(500).json(`${error}`);
        }
    }
}

export default new ProjectController();
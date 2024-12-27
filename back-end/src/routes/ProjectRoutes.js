import express from 'express'
import ProjectController from '../controller/ProjectController.js'

class ProjectRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {

    }

    getRouter() {
        return this.router;
    }
}

export default new ProjectRoutes().getRouter();
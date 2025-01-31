// Server.js
import express from "express";
import ProjectRoutes from './routes/ProjectRoutes.js'

class Server {
    constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
    }

    // Configure middleware for static files and JSON parsing
    configureMiddleware() {
    // Serve static files from the front-end
    this.app.use(express.static("../front-end/src"));

    // Parse JSON bodies, limited to 10mb
    this.app.use(express.json({ limit: "10mb" }));
    }

    // Setup routes by using imported ProjectRoutes
    setupRoutes() {
        this.app.use("/v1", ProjectRoutes); // Mount ProjectRoutes on the app
    }

    // Start the server on a specified port
    start(port = 3000) {
    this.app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
    }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();
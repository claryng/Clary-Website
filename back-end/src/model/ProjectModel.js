import { Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Project Title',
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'There is no description for this project.',
    },
    tech: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

class _ProjectModel {
    constructor(){}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        if(fresh) {
            // init with default values
            this.create({
                title: 'Project Title',
                description: 'Description',
                tech: 'Tech',
                time: 'December 27th, 2024',
                image: 'source'
            })
        }
    }

    async create(project) {
        return await Project.create(project);
    }
}

const ProjectModel = new _ProjectModel();

export default ProjectModel;
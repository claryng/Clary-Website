import { DataTypes, Sequelize } from 'sequelize';
import fileReader from 'fs';

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
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A'
    }
});

class _ProjectModel {
    constructor(){}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        if(fresh) {

            // read projects.csv
            const input = 'src/projects.csv';

            fileReader.readFile(input, 'utf8', (err, data) => {
                if(err) {
                    console.error('Error Reading file:', err);
                    return;
                }

                // Extract all records
                let quoted = false;
                const records = [];
                let record = '';
                for(let i = 0; i < data.length; i++) {
                    let c = data[i];
                    if(quoted) {
                        record += c;
                        if(c == '"') {
                            quoted = false;
                        }
                    } else {
                        if(c == '\n') {
                            records.push(record.trim());
                            record = '';
                        }else {
                            record += c;
                            if(c == '"') {
                                quoted = true;
                            }
                        }
                    }
                }
                records.push(record.trim());

                // Create new entries in Project table with the extracted records
                for(record of records) {
                    quoted = false;
                    let field = '';
                    const fields = [];
                    for(let i = 0; i < record.length; i++) {
                        let c = record[i];
                        if(quoted) {
                            if(c == '"') {
                                quoted = false;
                                c = '';
                            }
                            field += c;
                        }else {
                            if(c == ',') {
                                fields.push(field.trim());
                                field = '';
                            }else if(c == '"') {
                                quoted = true;
                            }else {
                                field += c;
                            }
                        }
                    }
                    fields.push(field.trim());
                    this.create({
                        title: fields[0],
                        description: fields[1],
                        tech: fields[2],
                        time: fields[3],
                        image: fields[4],
                        source: fields[5]
                    });
                }
            });
        }
    }

    async create(project) {
        return await Project.create(project);
    }

    async getAllRecords() {
        return await Project.findAll();
    }
}

const ProjectModel = new _ProjectModel();

export default ProjectModel;
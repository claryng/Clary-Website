import ProjectModel from './ProjectModel.js'

class _ModelFactory {
    async getModel(model = 'sqlite') {
        if(model === 'sqlite') {
            return ProjectModel;
        }else {
            await ProjectModel.init(true);
            return ProjectModel;
        }
    }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;
import 'babel-polyfill';
import DefaultConfig from './default';

export class ProjectConfig extends DefaultConfig {
	constructor (folder) {
		super();

		this.config = this.loadConfigJSON(`${folder}project.json`);
		this.config.path = folder;
		this.config.apig = this.config.apig ? this.config.apig : this.config.name;
		this.overrideLambdaConfig(this.config);
	}
}


export default ProjectConfig;
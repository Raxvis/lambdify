import deployer from './deployer';

const deployFile = async (functionPath, options) => {
	await deployer(functionPath, options);
};

export default deployFile;
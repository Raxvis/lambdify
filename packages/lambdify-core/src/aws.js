import AWS from 'aws-sdk';

const setProfile = (profile) => {
	if (profile) {
		AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile });
	}
};

const setRegion = (region, feedback) => {
	if (region) {
		AWS.config.update({ region });
	} else {
		feedback('WARNING: Defaulting to us-east-1 for region. Please define a region using --region or in your project.json file');
		AWS.config.update({ region: 'us-east-1' });
	}
};

export const apig = ({ feedback, profile, region }) => {
	setProfile(profile);
	setRegion(region, feedback);

	return new AWS.APIGateway({ apiVersion: '2015-07-09' });
};

export const lambda = ({ feedback, profile, region }) => {
	setProfile(profile);
	setRegion(region, feedback);

	return new AWS.Lambda({ apiVersion: '2015-03-31' });
};

export default {
	apig,
	lambda,
};
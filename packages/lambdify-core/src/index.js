import Lambdify from './lambdify';

export const deploy = (options, feedback, callback) => {
	const newFeedback = feedback ? feedback : (message) => (console.log(message));
	const lambdify = new Lambdify(options, newFeedback);

	if (callback) {
		lambdify.run().then(() => {
			newFeedback('Lambdify Finished');
			callback();
		});
	} else {
		lambdify.run().then(() => {
			newFeedback('Lambdify Finished');
		});
	}
};

export default { deploy };
module.exports = (event, name, value) => {
	if (!event.pathParameters) {
		event.pathParameters = {};
	}
	event.pathParameters[name] = value;
};

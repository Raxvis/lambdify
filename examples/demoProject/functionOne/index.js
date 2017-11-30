const run = (event) => {
	context.succeed({ test: 'true' });
};

exports.handle = (event, context) => run(event, context);

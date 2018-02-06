const run = (event, context) => {
	context.succeed({ test: 'true' });
};

exports.handle = (event, context) => run(event, context);

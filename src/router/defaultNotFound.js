const defaultNotFound = (req, res) => {
	console.log('==================');
	console.log('action not found');
	console.log(req.getEvent());
	console.log('==================');
	res.setStatusCode(404);

	return res.json({ error: 'action not found' });
};

module.exports = defaultNotFound;

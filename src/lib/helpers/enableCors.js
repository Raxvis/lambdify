module.exports = (res) => {
	res.headers = {
		...res.headers,
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': '*',
	};
};

const handleHeaders = require('./handleHeaders');

const handleRequestResponse = (response) =>
	new Promise((resolve, reject) => {
		const respBodyChunks = [];

		response.on('data', (chunk) => {
			respBodyChunks.push(Buffer.from(chunk));
		});
		response.on('error', reject);
		response.on('end', () => {
			const bodyBuffer = Buffer.concat(respBodyChunks);

			resolve({
				body: bodyBuffer.toString('base64'),
				headers: handleHeaders(response.headers, bodyBuffer),
				isBase64Encoded: true,
				statusCode: response.statusCode || 200,
			});
		});
	});

module.exports = handleRequestResponse;

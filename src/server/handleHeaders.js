const binarycase = require('binary-case');

const handleHeaders = (originalHeaders, bodyBuffer) => {
	// HACK: modifies header casing to get around API Gateway's limitation of not allowing multiple
	// headers with the same name, as discussed on the AWS Forum https://forums.aws.amazon.com/message.jspa?messageID=725953#725953
	delete originalHeaders.connection;

	return {
		'content-length': String(bodyBuffer.length),
		...Object.keys(originalHeaders).reduce((result, header) => {
			const value = originalHeaders[header];

			if (header.toLowerCase() === 'set-cookie' && Array.isArray(value)) {
				return {
					...result,
					...value.reduce(
						(headers, cookie, index) => ({ ...headers, [binarycase(header, index + 1)]: cookie }),
						{},
					),
				};
			}

			return {
				...result,
				[header.toLowerCase()]: Array.isArray(value) ? value.join(',') : value,
			};
		}, {}),
	};
};

module.exports = handleHeaders;

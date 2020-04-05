const getEventBody = (event) => Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');

module.exports = getEventBody;

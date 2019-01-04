module.exports = (record, path, defaultValue) =>
	path.match(/([^.[\]]+)/gu).reduce((result, piece) => result && result[piece], record) || defaultValue;

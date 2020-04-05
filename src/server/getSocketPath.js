const getSocketPath = () => {
	const socketPathSuffix = Math.random().toString(36).substring(2, 15);

	return `/tmp/server-${socketPathSuffix}.sock`;
};

module.exports = getSocketPath;

const chokidar = require('chokidar');
const fs = require('fs-extra');
const log = require('fancy-log');

fs.removeSync('./dist');

chokidar.watch('src/').on('all', (event, path) => {
	log(`${event} ${path}`);
	fs.copySync('./src/', './dist/');
	fs.copySync('./package.json', './dist/package.json');
	fs.copySync('./README.md', './dist/README.md');
});

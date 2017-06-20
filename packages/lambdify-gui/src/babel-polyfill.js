if (!(window && window._babelPolyfill) && !(global && global._babelPolyfill)) { // eslint-disable-line no-underscore-dangle
	require('babel-polyfill'); // eslint-disable-line global-require
}
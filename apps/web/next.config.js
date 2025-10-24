const path = require('node:path');

module.exports = {
	reactStrictMode: true,
	transpilePackages: ['ui'],
	outputFileTracingRoot: path.join(__dirname, '../../')
};

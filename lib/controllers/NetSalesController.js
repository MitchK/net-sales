var path    = require('path')
  , config  = require('../../config');

module.exports = function (req, res) {
	res.sendFile(path.join('fixtures', 'net-sales.json'), { root: config.baseDir });
};
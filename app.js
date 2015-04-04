// Dependencies
var express = require('express')
  , path    = require('path')
  , fs      = require('fs')
  , config  = require('./config');

// Create app
var app = express();


// Include controllers
var controllersDir = path.join('lib', 'controllers');

app.get('/', require('./' + path.join(controllersDir, 'MainController')));
app.get('/api/net-sales', require('./' + path.join(controllersDir, 'NetSalesController')));

// Include static files
app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(process.env.PORT || 3000, function () {
	console.log('Server started.');
});
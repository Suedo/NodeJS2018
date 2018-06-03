/**
* Basic routing and static path demo
*/

var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

/**
 * Setup the static path: Load files from the "public" directory
 __dirname ? http://stackoverflow.com/a/18283508/2715083
 note: 'public' itself is not going to be part of the path, but, whatever
 the path you specify, it will look for it inside the public folder
 hence:   <link rel="stylesheet" href="/css/styles.css">
 not:     <link rel="stylesheet" href="/public/css/styles.css">
 */
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

/**
 * Setup the routes
 return index.html when the root is accessed
 */
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

http.createServer(app).listen(3000);

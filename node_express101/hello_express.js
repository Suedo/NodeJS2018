var express = require('express');
var http = require('http');

// Initiate the middleware
var app = express();

// define middleware behaviour
app.use(function(req, res){
  console.log("in comes request to: " + req.url);
  res.end("Hello World!");
});

// Start the server with the middleware
http.createServer(app).listen(3000);

/**
* Middleware chain demo
* Log > Authenticate > Share secret
* Ideally, use 'Morgan' for all logger stuff
* https://github.com/expressjs/morgan
*/

var express = require('express');
var http = require('http');

// Initiate the middleware
var app = express();

// Logging Middleware
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

// Adding fake authentication middleware
app.use(function(req, res, next){
  var min = (new Date()).getMinutes();
  if( (min % 2) === 0 ){
    next(); // share secret message
  }
  else {
    res.stausCode = 403;
    res.end("Not Authorised!");
  }
});

// Response Middleware: share Secret if authorised
app.use(function(req, res){
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.end("The Secret message is: Swordfish");
});

// Start the server with the middleware
http.createServer(app).listen(3000);


/**
* Authentication using Morgan
* instead of vanilla express
//

var express = require('express');
var logger = require('morgan');
var http = require('http');

var app = express();

// logger("short") returns a function
app.use(logger("short"));

// give the same 'ol behaviour to our Middleware
app.use(function(req, res){
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.end("Hello with Morgan!")
});

// Start the server
http.createServer(app).listen(3000);

*/

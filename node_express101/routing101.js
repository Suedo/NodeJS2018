// show sundarban photos when i go to route /sunderban

var express = require('express');
var http    = require('http');
var logger  = require('morgan');


var app = express();

app.use(logger('dev'));

// if accessing /somjit, show this:
app.get('/user/:id', function(req,res){
  res.send(req.params.id + "'s Page!");
});

// if accessing anything else, show 404
app.use(function(req,res){
  res.status(404).send("404!!")
});

http.createServer(app).listen(3000, function(){
  console.log("routing started on localhost:3000");
});

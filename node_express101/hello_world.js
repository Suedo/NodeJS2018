/**
 * server creation 101
 */

var http = require('http');         //global module, at node_modules
// Modules downloaded from npm will always be a directory
// Cannot publish a single js file to npm as a module
// The directory will have a package.json and an index.js file


var mymod = require('./mymodule');  // local module

// This will return immediately,
http.createServer(function (req, res) {

  // ideally, type will be HTML, not 'plain'
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end(mymod.Greetings); // print to browser
  mymod.sayHello(); // print to log

}).listen(1337,'127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

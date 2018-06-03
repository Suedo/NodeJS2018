/**
 * Let’s use all that you’ve learned to build a more real application for this guestbook.
 * It turns out that all of these things will come in handy! Your site will have two pages:
 * 1. A homepage that lists all of the previously posted guestbook entries
 * 2. A page with an “add new entry” form
 */


// Needed modules
var http          = require('http');
var path          = require('path');
var logger        = require('morgan');
var express       = require('express');
var bodyParser    = require('body-parser');


// Make an express app
var app = express();


// Use PUG as view engine
app.set('views', path.resolve(__dirname,'views'));    // views folder
app.set('view engine', 'pug');

// Create a global array to store all entries
var entries = [];
app.locals.entries = entries;     // available to all views

// Use morgan to log every request
app.use(logger('dev'));

// Populates a variable called req.body if a form is submitted
// the 'extended' keyword is required
app.use(bodyParser.urlencoded({extended:false}));

// GET request: Home page
// process access to root: render index.html
app.get('/', function(req, res){
  res.render('index');
});

// GET request: new entry page
app.get('/new-entry', function(req, res){
  res.render('new-entry');
});

// POST request
// Require proper title and body from user submitted form
app.post("/new-entry", function(req, res) {
  if (!req.body.title || !req.body.body) {
    response.status(400).send("Entries must have a title and a body.");
    return;
  }
  // else, parse and pushinto Entries
  entries.push({
    title: req.body.title,
    body: req.body.body,
    published: new Date()
  });

  res.redirect("/");

});

// All other requests will be deemed invalid
app.use(function(req, res){
  res.status(404).render("404");  // nothing else can be found
})

// finally, create the server with above behaviour
http.createServer(app).listen(3000, function(){
  console.log("Guestbook started on localhost:3000");
});

// https://www.youtube.com/watch?v=G0BzzuXS8gI
// AJAX, RESTful API Tutorial - Perform CRUD Operations with Node Server
var express       = require('express');
var path          = require('path');
var app = express();

// test data
var products = [
  { id:1, name:'laptop' },
  { id:2, name:'microwave' }
]

var currentID = 2;

var PORT = process.env.PORT || 3000 ;  // what is this?

app.set('views', path.resolve(__dirname,'views'));    // views folder
app.set('view engine', 'pug');

var scriptsPath = path.resolve(__dirname, "TscriptsFol");
app.use(express.static(scriptsPath));

app.get('/', function(req, res){
  res.render('tIndex');
  console.log('at root');
});

app.get('/products', function(req, res){
  res.send({products: products});
});



app.listen(PORT, () => { console.log("listening on port" + PORT); })

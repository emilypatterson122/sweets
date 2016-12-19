var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

var desserts = [
  {name: "Cream Cake", image: " http://i.imgtc.com/E95yksb.jpg"},
  {name: "Red Velvet Cake", image: "http://i.imgtc.com/neag6Q4.jpg"},
  {name: "White Chocolate", image: "http://i.imgtc.com/D9CY418.jpg"}
];

app.get('/', function(req, res){
  res.render('landing');
});

app.get('/desserts', function(req, res){
  res.render('desserts',
    {desserts: desserts}
  )
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

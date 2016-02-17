var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var gameRoutes = require('./routes/book.js')(app);

var server = app.listen(3002, function() {
    console.log('Server running at http://127.0.0.1:3002/')
});
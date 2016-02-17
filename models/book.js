var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    
    name: String,
    rating: Number,
    genre: String
    
});

module.exports = mongoose.model('Book', bookSchema);
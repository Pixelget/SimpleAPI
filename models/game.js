var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    
    name: String,
    rating: Number,
    genre: String
    
});

module.exports = mongoose.model('Game', gameSchema);
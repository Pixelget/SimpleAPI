var _ = require('lodash');
var Game = require('../models/game.js');

module.exports = function(app) {
    
    /* Set / Add / Create */
    app.post('/game', function(req, res) {
        var newGame = new Game(req.body);
        newGame.save(function(err) {
            if (err) {
                res.json({info: 'error during game create', error: err});
                return;
            }
            res.json({info: 'game created successfully'});
        });
    });
    
    /* Get / Read */
    app.get('/game', function (req, res) {
        Game.find(function (err, game) {
            if (err) {
                res.json({info: 'error during find games', error: err});
                return;
            }
            res.json({info: 'game found successfully', data: game});
        });
    });
    
    app.get('/game/:id', function(req, res) {
        Game.findById(req.params.id, function(err, game) {
            if (err) {
                res.json({info: 'error during find game', error: err});
                return;
            };
            if (game) {
                res.json({info: 'game found successfully', data: game});
            } else {
                res.json({info: 'game not found'});
            }
        });
    });
    
    /* Update */
    app.put('/game/:id', function(req, res) {
        Game.findById(req.params.id, function(err, game) {
            if (err) {
                res.json({info: 'error during game update', error: err});
                return;
            };
            if (game) {
                _.merge(game, req.body);
                game.save(function (err) {
                    if (err) {
                        res.json({info: 'error during game update', error: err});
                        return;
                    };
                   res.json({info: 'game updated successfully'}); 
                });
            } else {
                res.json({info: 'game not found'});
            }
        });
    });
    
    /* Delete */
    app.delete('/game/:id', function(req, res) {
        Game.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove', error: err});
                return;
            };
            res.json({info: 'game removed successfully'});
        });
    });
};
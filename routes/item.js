var r = require('request').defaults({
    json: true
});

var async = require('async');

module.exports = function(app) {
    /* Read */
    app.get('/items', function (req, res) {
        
        async.parallel({
            game: function(callback){
                r({uri: 'http://localhost:3001/game'}, function(error, response, body) {
                    if (error) {
                        callback({service: 'game', error: error});
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(response.statusCode);
                    }
                });
            },
            book: function(callback){
                r({uri: 'http://localhost:3002/book'}, function(error, response, body) {
                    if (error) {
                        callback({service: 'book', error: error});
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(response.statusCode);
                    }
                });
            }
        },
        function (error, results) {
            res.json({
                error: error,
                results: results
            });
        });
        
    });
    
    app.get('/ping', function (req, res) {
        res.json({pong: Date.now()});
    });
    
};
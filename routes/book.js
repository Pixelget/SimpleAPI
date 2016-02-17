var _ = require('lodash');
var Book = require('../models/book.js');

module.exports = function(app) {
    
    /* Set / Add / Create */
    app.post('/book', function(req, res) {
        var newBook = new Book(req.body);
        newBook.save(function(err) {
            if (err) {
                res.json({info: 'error during book create', error: err});
                return;
            }
            res.json({info: 'book created successfully'});
        });
    });
    
    /* Get / Read */
    app.get('/book', function (req, res) {
        Book.find(function (err, book) {
            if (err) {
                res.json({info: 'error during find books', error: err});
                return;
            }
            res.json({info: 'book found successfully', data: book});
        });
    });
    
    app.get('/book/:id', function(req, res) {
        Book.findById(req.params.id, function(err, book) {
            if (err) {
                res.json({info: 'error during find book', error: err});
                return;
            };
            if (book) {
                res.json({info: 'book found successfully', data: book});
            } else {
                res.json({info: 'book not found'});
            }
        });
    });
    
    /* Update */
    app.put('/book/:id', function(req, res) {
        Book.findById(req.params.id, function(err, book) {
            if (err) {
                res.json({info: 'error during book update', error: err});
                return;
            };
            if (book) {
                _.merge(book, req.body);
                book.save(function (err) {
                    if (err) {
                        res.json({info: 'error during book update', error: err});
                        return;
                    };
                   res.json({info: 'book updated successfully'}); 
                });
            } else {
                res.json({info: 'book not found'});
            }
        });
    });
    
    /* Delete */
    app.delete('/book/:id', function(req, res) {
        Book.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove', error: err});
                return;
            };
            res.json({info: 'book removed successfully'});
        });
    });
};
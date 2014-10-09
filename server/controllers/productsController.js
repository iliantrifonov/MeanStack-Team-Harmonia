var Product = require('mongoose').model('Product');

module.exports = {
    getAll: function(req, res, next) {
        Product.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getById: function(req, res, next) {
        Product.findOne({_id: req.params.id}).exec(function(err, data) {
            if (err) {
                console.log('Course could not be loaded: ' + err);
            }

            res.send(data);
        })
    }
};

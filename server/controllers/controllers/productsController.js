var Product = require('mongoose').model('Product');

module.exports = {
    name: 'products',
    data: {
        updateProduct: function (req, res, next) {
            if(!req.body._id){
                console.log('You should provide product _id');
                res.status(400);
                res.end();
                return;
            }

            var updatedProductData = req.body;

            Product.update({_id: req.body._id}, updatedProductData, function () {
                res.end();
            });
        },
        createProduct: function(req, res, next){
            var newProductData = req.body;

            Product.create(newProductData, function (err, product) {
                if (err) {
                    console.log('Failed to add new product: ' + err);
                    res.status(400);
                    res.end();
                    return;
                }
                res.send(product);

            });
        },
        getByPage: function (req, res, next) {
            console.log(req.query.page)
            var options = {
                limit: 10,
                skip: req.query.page * 10,
                sort: "published"
            }
            Product.find({},{},options).exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }
                res.send(collection);
            })
        },
        getAll: function (req, res, next) {

            Product.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }

                res.send(collection);
            })
        },
        getById: function (req, res, next) {
            Product.findOne({_id: req.params.id}).exec(function (err, data) {
                if (err) {
                    console.log('Course could not be loaded: ' + err);
                }

                res.send(data);
            })
        }
    }
};

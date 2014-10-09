var Product = require('mongoose').model('Product');
var mongoose = require('mongoose');
var escape = require('escape-html');
require('mongoose-middleware').initialize(mongoose);

module.exports = {
    name: 'products',
    data: {
        updateProduct: function (req, res, next) {
            var userId = req.user.id;

            if(!req.body._id){
                console.log('You should provide product _id');
                res.status(400);
                res.end();
                return;
            }

            var updatedProductData = req.body;

            updatedProductData.name = escape(updatedProductData.name);
            updatedProductData.description  = escape(updatedProductData.description);
            updatedProductData.picture  = escape(updatedProductData.picture);
            updatedProductData.additionalInfo  = escape(updatedProductData.additionalInfo);

            Product.findOne({_id: req.body._id}).exec(function (err, data) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }

                if (!data) {
                    res.status(400).send('No such product');
                    return;
                }

                Product.update({_id: req.body._id}, updatedProductData, function () {
                    res.end();
                });
            });
        },
        createProduct: function(req, res, next){
            var newProductData = req.body;
            newProductData.seller = req.user.id;

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
        getAll: function (req, res, next) {
            var queryParams = req.query;
            if(isEmpty(queryParams)) {
                Product.find({}).exec(function (err, collection) {
                    if (err) {
                        console.log('Products could not be loaded: ' + err);
                    }

                    res.send(collection);
                })
            }
            else if(queryParams["name"] != null){
                getByName(req, res);
            }
            else if(queryParams["page"] != null){
                getByPage(req, res);
            }
        },
        getById: function (req, res, next) {

            Product.findOne({_id: req.params.id}).exec(function (err, data) {
                if (err) {

                    console.log('Course could not be loaded: ' + err);
                }

                res.send(data);
            });
        }
    }
};

function getByName(req, res) {
    Product.find({name: req.query.name}).exec(function (err, collection) {
        if (err) {
            console.log('Products could not be loaded: ' + err);
            res.status(400);
            return res.send({reason: 'Products could not be loaded: ' + err.toString()});
        }

        res.send(collection);
    });
}

function getByPage(req, res) {

    var name = req.query.name;
    var page = req.query.page * 10 || 0;
    var order = req.query.order || "asc";
    var sortBy = req.query.sortBy || 'name';

    var options = {
        start : page,
        count : 10
    };
    if(order === "asc"){
        options.sort = {asc: sortBy};
    }
    else{
        options.sort = {desc: sortBy};
    }

    Product.find({})
          .field(options)
          .filter(options)
          .order(options)
          .page(options, function (err, collection) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
                res.status(400);
                return res.send({reason: 'Products could not be loaded: ' + err.toString()});
            }

            res.send(collection.results);
        });
};


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
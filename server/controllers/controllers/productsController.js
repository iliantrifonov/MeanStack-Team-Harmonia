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
        getAll: function (req, res, next) {
            var queryParams = req.query;
            console.log(queryParams);
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
    var options = {
        limit: 10,
        skip: req.query.page * 10,
        sort: req.query.sortBy
    };

    Product.find({},{},options).exec(function (err, collection) {
        if (err) {
            console.log('Products could not be loaded: ' + err);
            res.status(400);
            return res.send({reason: 'Products could not be loaded: ' + err.toString()});
        }

        res.send(collection);
    })
}

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
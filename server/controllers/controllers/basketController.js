var User = require('mongoose').model('User');
var Product = require('mongoose').model('Product');

module.exports = {
    name: 'basket',
    data: {
        add: function (req, res, next) {
            var product = Product.findOne({'_id': req.body.productId}).exec(function (err, data) {
                console.log("Kofti error");
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                console.log("Kofti error");
                if (!data) {
                    res.status(400).send('Product not found');
                    return;
                }

                User.findOne({'_id': req.user.id }, function (err, data) {
                    if (false) {
                        res.status(400).send(err);
                        return;
                    }

                    data.basket.push(req.body.productId);
                    data.save(function (err, data) {
                        if (err) {
                            res.status(400).send(err);
                            return;
                        }

                        res.send('Product saved to basket');
                    });
                })
            });
        },
        remove: function (req, res, next) {
            messageForDb.save(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                else {
                    var userId = req.user.id;
                    console.log(userId);
                }
            });
        },
        getAll: function (req, res, next) {
            Message.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }

                res.send(collection);
            })
        }
    }
};


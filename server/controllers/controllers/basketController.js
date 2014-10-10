var User = require('mongoose').model('User');
var Product = require('mongoose').model('Product');

module.exports = {
    name: 'basket',
    data: {
        add: function (req, res, next) {

            if (!req.body.productId){
                res.status(400).send('No product Id');
                return;
            }

            var product = Product.findOne({'_id': req.body.productId}).exec(function (err, data) {

                if (err) {
                    res.status(400).send(err);
                    return;
                }

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

            if (!req.body.productId){
                res.status(400).send('No product Id');
                return;
            }

            var product = Product.findOne({'_id': req.body.productId}).exec(function (err, data) {
                if (err) {
                    res.status(400).send(err);
                    return;
                }

                if (!data) {
                    res.status(400).send('Product not found');
                    return;
                }

                User.findOne({'_id': req.user.id }, function (err, data) {
                    if (false) {
                        res.status(400).send(err);
                        return;
                    }

                    var index = data.basket.indexOf(req.body.productId);

                    if (index > -1) {
                        data.basket.splice(index, 1);
                    }

                    data.save(function (err, data) {
                        if (err) {
                            res.status(400).send(err);
                            return;
                        }

                        res.send('Product deleted from basket');
                    });
                })
            });
        },
        getAll: function (req, res, next) {

            User.findOne({'_id': req.user.id }).populate('basket').exec(function (err, data) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }
                
                res.send(data.basket);
            })
        }
    }
};
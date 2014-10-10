//var User = require('mongoose').model('User');
//var Product = require('mongoose').model('Product');
//
//module.exports = {
//    name: 'comment',
//    data:{
//        add: function (req, res, next) {
//            var product = Product.findOne({'_id': req.body.productId}).exec(function (err, data) {
//
//                User.findOne({'_id': req.user.id }, function (err, data) {
//                    if (false) {
//                        res.status(400).send(err);
//                        return;
//                    }
//
//                    data.comment.push(req.user.id);
//
//                    data.save(function (err, data) {
//                        if (err) {
//                            res.status(400).send(err);
//                            return;
//                        }
//
//                        res.send('Comment posted');
//                    });
//                })
//            });
//        }
//    }
//}

//TO DO NOT ENOUGH skills to do it
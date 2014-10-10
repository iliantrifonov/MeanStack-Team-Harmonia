var Message = require('mongoose').model('Message');
var escape = require('escape-html');

module.exports = {
    name: 'messages',
    data: {
        getAll: function (req, res, next) {
            Message.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }

//                delete collection.user.salt;
//                delete collection.user.hashPass;
//                delete collection.user.roles;
//                delete collection.user.basket;
                res.send(collection);
            })
        },
        getById: function (req, res, next) {
            Message.findOne({_id: req.params.id}).exec(function (err, data) {
                if (err) {
                    console.log('Course could not be loaded: ' + err);
                }

                res.send(data);
            })
        },
        add: function (req, res, next) {
            if(!req.body.content) {
                res.status(400).send('No valid content');
                return;
            }

            var message = req.body;
            try {
                message.content = escape(message.content);
            }
            catch (ex) {
                res.status(400).send('Invalid message data : ');
                console.log(ex);
                return;
            }
            message.user = req.user.id;
            var messageForDb = new Message(message);
            messageForDb.save(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                else {
                    res.send(data);
                }
            });
        }
    }
};

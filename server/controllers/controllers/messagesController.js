var Message = require('mongoose').model('Message');

module.exports = {
    name: 'messages',
    data: {
        getAll: function (req, res, next) {
            Message.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }

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
            // TODO: verify data
            var messsage = req.body;
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

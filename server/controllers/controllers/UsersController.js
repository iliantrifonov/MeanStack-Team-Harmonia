var encryption = require('../../utilities/encryption');
var User = require('mongoose').model('User');
var escape = require('escape-html');

module.exports = {
    name: 'users',
    data: {
        createUser: function (req, res, next) {
            var newUserData = req.body;
            newUserData.username = escape(newUserData.username);
            newUserData.firstName = escape(newUserData.firstName);
            newUserData.lastName = escape(newUserData.lastName);

            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            User.create(newUserData, function (err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }

                    res.send(user);
                })
            });
        },
        updateUser: function (req, res, next) {
            if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
                var updatedUserData = req.body;
                if (updatedUserData.password && updatedUserData.password.length > 0) {
                    updatedUserData.salt = encryption.generateSalt();
                    updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                }

                User.update({_id: req.body._id}, updatedUserData, function () {
                    res.end();
                })
            }
            else {
                res.send({reason: 'You do not have permissions!'})
            }
        },
        getAllUsers: function (req, res) {
            User.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }

                res.send(collection);
            })
        },
        getRoles: function(req, res) {
            User.findOne({'_id': req.params.id}).exec(function(err, data){
                if (err) {
                    res.status(400).send(err);
                    return;
                }

                if (!data) {
                    res.status(400).send('No such user');
                    return;
                }

                res.send(data.roles);
            });
        },
        addRole: function(req, res) {
            if (!req.body.role) {
                res.status(400).send('Not a valid role');
                return;
            }

            User.findOne({'_id': req.body.id}).exec(function(err, data){
                if (err) {
                    res.status(400).send(err);
                    return;
                }

                if (!data) {
                    res.status(400).send('No such user');
                    return;
                }

                data.roles.push(req.body.role);
                data.save(function(err, data) {
                    if (err) {
                        res.status(400).send(err);
                        return;
                    }

                    res.send('Roles successfully updated');
                });
            });
        },
        removeRole: function(req, res) {
            if (!req.body.role) {
                res.status(400).send('Not a valid role');
                return;
            }

            User.findOne({'_id': req.body.id}).exec(function(err, data){
                if (err) {
                    res.status(400).send(err);
                    return;
                }

                if (!data) {
                    res.status(400).send('No such user');
                    return;
                }

                var index = data.roles.indexOf(req.body.role);

                if (index > -1) {
                    data.roles.splice(index, 1);
                }
                else {
                    res.send('No such role for this user');
                    return;
                }

                data.save(function(err, data) {
                    if (err) {
                        res.status(400).send(err);
                        return;
                    }

                    res.send('Roles successfully updated');
                });
            });
        }
    }
};
var mongoose = require('mongoose');
//    user = require('../models/User'),
//    course = require('../models/Course'),
//    product = require('../models/Product');

var fs = require('fs');
var models = fs.readdirSync('./server/models');
var morelsRequired = [];
for (var i = 0; i < models.length; i++) {
    morelsRequired.push(require('../models/' + models[i]));
}

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    for (var i = 0; i < morelsRequired.length; i++) {
        morelsRequired[i].seedInitial();
    }
};
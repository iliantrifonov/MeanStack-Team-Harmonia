//var usersController = require('controllers/UsersController');
//var coursesController = require('controllers/coursesController');
//var productsController = require('controllers/productsController');

module.exports = {};

var fs = require('fs');
var controllers = fs.readdirSync('./server/controllers/controllers');
for (var i = 0; i < controllers.length; i++) {
    var current = require('./controllers/' + controllers[i]);
    module.exports[current.name] = current.data;
}

//module.exports = {
//    users: usersController,
//    courses: coursesController,
//    products: productsController
//}
var usersController = require('../controllers/usersController');
var coursesController = require('../controllers/coursesController');
var productsController = require('../controllers/productsController');

module.exports = {
    users: usersController,
    courses: coursesController,
    products: productsController
}
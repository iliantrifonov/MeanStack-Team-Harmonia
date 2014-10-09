var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/courses', controllers.courses.getAllCourses);
    app.get('/api/courses/:id', controllers.courses.getCourseById);


    app.put('/api/products', controllers.products.updateProduct);
    app.post('/api/products', controllers.products.createProduct);
    app.get('/api/products', controllers.products.getByPage);// ?page=(number)
    app.get('/api/products', controllers.products.getAll);
    app.get('/api/products/:id', controllers.products.getById);


    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    })

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
}
var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    // for users
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    // for admins
    app.get('/api/admin/users/:id', auth.isInRole('admin'), controllers.users.getRoles);
    app.post('/api/admin/users', auth.isInRole('admin'), controllers.users.addRole);
    app.delete('/api/admin/users', auth.isInRole('admin'), controllers.users.removeRole);

    // for basket
    app.get('/api/basket', auth.isAuthenticated, controllers.basket.getAll);
    app.post('/api/basket', auth.isAuthenticated, controllers.basket.add);
    app.delete('/api/basket', auth.isAuthenticated, controllers.basket.remove);

    // TODO: Delete
    app.get('/api/courses', controllers.courses.getAllCourses);
    app.get('/api/courses/:id', controllers.courses.getCourseById);

    // for products
    // TODO: Add more
    app.put('/api/products', auth.isInRole('seller'), controllers.products.updateProduct);
    app.post('/api/products', auth.isInRole('seller'), controllers.products.createProduct);
    app.get('/api/products', controllers.products.getAll);
    app.get('/api/products/:id', controllers.products.getById);


    // for messages
    
    app.get('/api/messages', controllers.messages.getAll);
    app.post('/api/messages', controllers.messages.add);

    // for partials
    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    // for auth
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // error handler
    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    // main index
    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};
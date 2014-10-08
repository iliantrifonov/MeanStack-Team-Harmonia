var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/products-db',
        port: process.env.PORT || 12344
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://localhost/products-db',
        port: process.env.PORT || 12344
    }
}
'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product');

/**
 * Globals
 */
var user, product;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            username: 'username',
            password: 'password'
        });

        user.save(function() {
            product = new Product({
                name: 'Test name',
                description: 'Test description',
                picture: 'http://somewebsite.website',
                additionalInfo: 'Not required additional info',
                price: 100,
                stock: 100,
                stars: 1,
                seller: user
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('correct data should be able to save without problems', function(done) {
            return product.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without name', function(done) {
            product.name = '';

            return product.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without description', function(done) {
            product.description = '';

            return product.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without picture', function(done) {
            product.picture = '';

            return product.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without price', function(done) {
            product.price = undefined;

            return product.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without stock', function(done) {
            product.stock = undefined;

            return product.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should set date when content is correct', function(done) {

            return product.save(function(err, data) {
                should.not.exist(err);

                should.exist(data.published);

                done();
            });
        });
    });

    afterEach(function(done) {
        Product.remove().exec();
        User.remove().exec();
        done();
    });
});

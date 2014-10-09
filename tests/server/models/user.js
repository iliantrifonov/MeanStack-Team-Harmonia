'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function() {
    before(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            username: 'username',
            password: 'password'
        });

        user2 = new User({
            firstName: 'Full',
            lastName: 'Name',
            username: 'username',
            password: 'password'
        });

        done();
    });

    describe('Method Save', function() {
        it('should begin with no users', function(done) {
            User.find({}, function(err, users) {
                users.should.have.length(0);
                done();
            });
        });

        it('should be able to save without problems', function(done) {
            user.save(done);
        });

        it('should fail to save an existing user again', function(done) {
            user.save();
            return user2.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without first name', function(done) {
            user.firstName = '';
            return user.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without last name', function(done) {
            user.lastName = '';
            return user.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without user name', function(done) {
            user.username = '';
            return user.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    after(function(done) {
        User.remove().exec();
        done();
    });
});

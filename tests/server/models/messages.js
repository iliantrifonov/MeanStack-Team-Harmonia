'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Message = mongoose.model('Message');

/**
 * Globals
 */
var user, message;

/**
 * Unit tests
 */
describe('Message Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            username: 'username',
            password: 'password'
        });

        user.save(function() {
            message = new Message({
                content: 'Content',
                user: user
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            return message.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without title', function(done) {
            message.content = '';

            return message.save(function(err) {
                should.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Message.remove().exec();
        User.remove().exec();
        done();
    });
});
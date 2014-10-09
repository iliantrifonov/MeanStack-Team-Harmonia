'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment');

/**
 * Globals
 */
var user, comment;

/**
 * Unit tests
 */
describe('Comment Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            username: 'username',
            password: 'password'
        });

        user.save(function() {
            comment = new Comment({
                content: 'Content',
                user: user
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('correct data should be able to save without problems', function(done) {
            return comment.save(function(err) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to show an error when try to save without content', function(done) {
            comment.content = '';

            return comment.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should set date when content is correct', function(done) {

            return comment.save(function(err, data) {
                should.not.exist(err);

                should.exist(data.published);

                done();
            });
        });
    });

    afterEach(function(done) {
        Comment.remove().exec();
        User.remove().exec();
        done();
    });
});
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    published: {
        type: Date,
        default: Date.now
    },
    content: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var Course = mongoose.model('Comment', commentSchema);
module.exports.seedInitial = function () {
    // TODO: Seed initial products
};


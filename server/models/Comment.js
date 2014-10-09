var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    published: {
        type: Date,
        default: Date.now
    },
    content: {
        type:String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports.seedInitial = function () {
    // TODO: Seed initial products
};


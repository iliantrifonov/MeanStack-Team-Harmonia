var mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
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

var Course = mongoose.model('Message', messagesSchema);
module.exports.seedInitial = function () {
    // TODO: Seed initial products
};


var mongoose = require('mongoose');

var productsCommentsSchema = mongoose.Schema({
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
});

var Course = mongoose.model('ProductsComments', productsCommentsSchema);
module.exports.seedInitial = function () {
    // TODO: Seed initial products
};

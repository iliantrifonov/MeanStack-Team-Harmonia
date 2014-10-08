var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    price: Number,
    stock: Number,
    featured: Boolean,
    published: {
        type: Date,
        default: Date.now
    },
    categories: [String],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var Course = mongoose.model('Product', productsSchema);
module.exports.seedInitial = function () {
    // TODO: Seed initial products
};

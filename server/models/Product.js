var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    additionalInfo: String,
    price: Number,
    stock: Number,
    stars: Number,
    featured: Boolean,
    published: {
        type: Date,
        default: Date.now
    },
    categories: [String],
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comments: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductsComments'
    }
});

var Course = mongoose.model('Product', productsSchema);
module.exports.seedInitial = function () {
    // TODO: Seed initial products
};

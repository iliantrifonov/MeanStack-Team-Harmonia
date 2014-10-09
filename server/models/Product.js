var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
    name: { type: String, required:true},
    description: { type: String, required:true},
    picture: { type: String, required:true},
    additionalInfo: String,
    price: { type: Number, required:true},
    stock: { type: Number, required:true},
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
        //required:true
    },
    comments: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductsComments'
    }
});

var Product = mongoose.model('Product', productsSchema);
module.exports.seedInitial = function () {
    Product.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }
        if (collection.length === 0) {
            Product.create({name: 'Kitova mas', description: 'mnogo e vkusna', picture: 'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo: "nqma", price: 2, stock: 10, stars: 3, featured: true, categories: ['food']})
            Product.create({name: 'porova mas', description: 'mnogo e vkusna', picture: 'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo: "nqma", price: 2, stock: 10, stars: 3, featured: true, categories: ['food']})
            Product.create({name: 'Kit', description: 'mnogo e vkusna', picture: 'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo: "nqma", price: 2, stock: 10, stars: 3, featured: true, categories: ['food']})
            Product.create({name: 'mas', description: 'mnogo e vkusna', picture: 'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo: "nqma", price: 2, stock: 10, stars: 3, featured: true, categories: ['food']})
        }
    })
};

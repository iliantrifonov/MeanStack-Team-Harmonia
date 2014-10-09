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

var Product = mongoose.model('Product', productsSchema);
module.exports.seedInitial = function () {
    Product.create({name :'Kitova mas', description:'mnogo e vkusna', picture:'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo:"nqma",price: 2, stock:10, stars:3,featured: true ,categories: ['food']})
    Product.create({name :'porova mas', description:'mnogo e vkusna', picture:'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo:"nqma",price: 2, stock:10, stars:3,featured: true ,categories: ['food']})
    Product.create({name :'Kit', description:'mnogo e vkusna', picture:'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo:"nqma",price: 2, stock:10, stars:3,featured: true ,categories: ['food']})
    Product.create({name :'mas', description:'mnogo e vkusna', picture:'http://www.likecool.com/Gear/Pic/Weird%20animals/Weird-animals.jpg', additionalInfo:"nqma",price: 2, stock:10, stars:3,featured: true ,categories: ['food']})
};

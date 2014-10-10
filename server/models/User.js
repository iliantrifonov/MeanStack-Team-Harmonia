var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, required: '{PATH} is required', unique: true },
    firstName: { type: String, required: '{PATH} is required' },
    lastName: { type: String, required: '{PATH} is required' },
    salt: String,
    hashPass: String,
    roles: [String],
    basket: [{
        type: mongoose.Schema.ObjectId,
        ref : "Product"
    }]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
})

var User = mongoose.model('User', userSchema);

module.exports.seedInitial = function() {

    User.findOne({username: '2@1.1'}).exec(function (err, data) {
        if (err || !data) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '111111');
            User.create({username: '2@1.1', firstName: '1@1.1', lastName: '1@1.1', salt: salt, hashPass: hashedPwd, roles: ['admin', 'seller']});
        }
    });

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Ivaylo');
            User.create({username: 'ivaylo.kenov', firstName: 'Ivaylo', lastName: 'Kenov', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Nikolay');
            User.create({username: 'Nikolay.IT', firstName: 'Nikolay', lastName: 'Kostov', salt: salt, hashPass: hashedPwd, roles: ['standard']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Doncho');
            User.create({username: 'Doncho', firstName: 'Doncho', lastName: 'Minkov', salt: salt, hashPass: hashedPwd});
            console.log('Users added to database...');
        }
    });
};
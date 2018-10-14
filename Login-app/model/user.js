const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema
const UserSchema = mongoose.Schema({
    username:{
        type : String,
        index : true
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    name:{
        type:String
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10 , function(err,salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
        // store hash in our password DB.
        newUser.password = hash;
        newUser.save(callback);
            
        });
    });
}

module.exports.getUserByUsername = function(username , callback){
    const query = {username:username};
    User.findOne(query, callback);
}
module.exports.getUserById = function(id , callback){
    User.findById(id, callback);
}
module.exports.comparePassword = function(candidatePassword ,hash, callback ){
    bcrypt.compare(candidatePassword,hash,function(err, isMatch){
        if(err) throw err;
        callback(null,isMatch);

    });
}
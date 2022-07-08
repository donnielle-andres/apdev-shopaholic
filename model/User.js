const mongoose = require('mongoose');

/*
    SCHEMA: Account information 
    Desc: Information needed to create a new account during sign up
*/

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    displayname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    phonenum: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true
    },

    logged: {
        type: Boolean, 
        default: false
    },

    displaypic:
    {
        type: String,
        default : "../public/img/default.png"
    }
 
});

module.exports = mongoose.model('User', UserSchema);
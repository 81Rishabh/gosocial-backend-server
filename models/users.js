const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
       type : String,
       required : true,
    },
    conform_password : {
        type : String,
        required : true,
    },
},{
    timestamps : true
});

const User = mongoose.model('User' , Users);
module.exports = User;
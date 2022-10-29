const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const getStorage = require('../helper/multer_storage');

const UserSchema = new mongoose.Schema({
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
    },
    avatar : {
        type : String,
    },
    friends : [{
        to_user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        from_user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    }],
    resetPasswordToken :  String,
    resetPasswordExpiresIn : Date 
    
},{
    timestamps : true
});


  UserSchema.statics.uploadsAvatar = multer({ storage: getStorage(AVATAR_PATH)  }).single('avatar');
  UserSchema.statics.avatar_path = AVATAR_PATH;



// Generate reset token nd hash token
UserSchema.methods.getResetPasswordToken = function() {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // hash token and set it to resetPasswordToken
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

     // expires the token
    this.resetPasswordExpiresIn = Date.now()  + 10 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User' , UserSchema);
module.exports = User;
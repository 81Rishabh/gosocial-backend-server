const User = require('../models/users');
const forgoPassMailer = require('../config/mailers/reset_password_mailer');
const crypto = require('crypto');

module.exports.profile = function(req , res) {
   return res.render('users' , {
       title : "profile"
  });
}


// Get singup view page
module.exports.signUp = function(req , res) {
   if(req.isAuthenticated()) {
      return res.redirect('/users/profile')
   }
   return res.render("signUp" , {title : "Users Sign Up"});
}

// Get signin view page
module.exports.signIn = function(req , res) {
   if(req.isAuthenticated()) {
      return res.redirect('/users/profile')
   }
   return res.render('signIn' , {title : "Users Sign in"});
}

//  creating user
// user found redirect them to sign in page
// user not found create new 
module.exports.create = function(req , res) {
    User.findOne({email : req.body.email} , function(err, user) {
      if(err) {console.log("error in finding user while signing in....! 👎"); return res.redirect('back')}
      
       //  if user not found 
       //  create new user
       if(!user) {
          User.create(req.body , function(err, user){
            if(err) {console.log("error in finding user while signing in....! 👎"); return res.redirect('back')}
            return res.redirect('/users/SignIn');
          })
       }
       else {
           //  user has found 
           // redirect to sign in page
           return res.redirect('/users/SignIn');
       }
    })
}


module.exports.createSession = function (req, res) {
   req.flash('success' , 'Logged in successfuly');
   return res.redirect('/');
}


// signing out
module.exports.distroySession = function (req, res) {
     req.logout();
     req.flash('success' , 'You have logged out!');
     return res.redirect('/');
}

// reset password a
module.exports.verifyEmail = function (req, res) {
   return res.render('_verify-email');
}

module.exports.resetPasswordView = function (req, res){
   let token = req.params.token;
   return res.render('reset_password' , {token : token});
}


module.exports.ForgotPassword = async function (req, res) {
     try {
        let user =  await User.findOne({email : req.body.email});
        
      //   is user not found show notification to view page
      if(!user) {
           req.flash('success' , 'There is no user with that email');
           return res.redirect('back');
      }
      
      // Get reset password token
      let resetToken = user.getResetPasswordToken();
      await user.save({validateBeforeSave : false});
     
      // generate link to set you password
      let resetLink = `${req.protocol}://${req.get('host')}/users/reset-password/${resetToken}`;

      // send email to client
      forgoPassMailer.resetPassword(user , resetLink);

      return res.redirect('back');
     } catch (error) {
        console.log(error);
        return res.redirect('/users/reset-password');
     }
}

module.exports.resetPassword = async function (req, res) {
    let token = req.params.token;
    try {
      let resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

      let user = await User.findOne({resetPasswordToken: resetPasswordToken , resetPasswordExpiresIn : {$gt : Date.now()}});
      
      if(!user) {
         console.log("There is no user exist");
         return  res.redirect('back');
      }
     
      user.password = req.body.password,
      user.conform_password = req.body.conform_password;
      user.resetPasswordToken = undefined;

      // reupdating the user
      await user.save();

    } catch (error) {
        console.log("Error" , error);
    }
    
    return res.redirect('back');
}
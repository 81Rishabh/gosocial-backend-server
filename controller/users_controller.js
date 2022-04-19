const User = require('../models/users');

module.exports.profile = function(req , res) {
   return res.render('users' , {title : "profile"});
}

module.exports.signUp = function(req , res) {
   return res.render("signUp" , {title : "Users Sign Up"});
}


module.exports.signIn = function(req , res) {
   return res.render('signIn' , {title : "Users Sign in"});
}

module.exports.create = function(req , res) {
    User.findOne({email : req.body.email} , function(err, user) {
       if(err) {console.log("Users not found....! 👎"); return res.redirect('back')}
      
       //  if user not found 
       //  create new user
       if(!user) {
          User.create(req.body , function(err, user){
            if(err) {console.log("Users not found....! 👎"); return res.redirect('back')}
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
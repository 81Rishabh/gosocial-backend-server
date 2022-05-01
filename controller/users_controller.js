const User = require('../models/users');

module.exports.profile = function(req , res) {
   // const ID = req.cookies.id;
   // if(req.cookies.id) {
   //    User.findById(ID , function(err, user) {
   //        if(user) {
   //           return res.render('users' , {
   //              title : "profile" ,
   //               user : user
   //          });
   //        }
   //    });
   // }else  {
   //     // handle cookie not found 
   //    // redirect back to signIn page
   //    return res.redirect('/users/SignIn');
   // }

   const user = {
      username : 'rishabh',
      email : 'rishabh@gmail.com',
   };

   return res.render('users' , {
      title : "profile" ,
       user : user
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
   return res.redirect('/');
}


// signin out
module.exports.distroySession = function (req, res) {
     req.logout();
     return res.redirect('/');
}
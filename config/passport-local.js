const passport = require('passport');

const LocalStratergy = require('passport-local').Strategy;

// require User Modle
const User = require('../models/users');

passport.use(new LocalStratergy({
    usernameField : 'email',
    passReqToCallback : true
},
   function (req, email , password , done) {
      User.findOne({email : email} , function(err , user){
           if(err) {
              req.flash('error' , err);
              return done(err);
           }

           if(!user || user.password != password) {
               req.flash('error' , 'Invalid Username/Password');
               return done(null , false);
           }
           return done(null , user);
      });
   }
));


// serialzing the user to decide which key to be kept 
passport.serializeUser(function(user , done){
     done(null , user.id);
});

// deserialzing the user from the key in the cookie
passport.deserializeUser(function(id , done){
   User.findById(id , function(err, user){
    if(err) {
        console.log('Error in finding user --> passport', err);
        return done(err);
     }
     return done(null , user);
   })
});

// check if user is already authenticated
passport.checkAuthentication = function(req, res,next) {
    //  if user is signed in  , then pass on the request  to the next function(controller's action)
   if(req.isAuthenticated()) {
       next();
   }
   return res.redirect('/users/signIn');
}

// set authenticated user 
passport.setAuthenticatedUser = function(req, res, next) {
  if(req.isAuthenticated()) {
       // req.user contains the currently logged in user form the session and sending this to locals form the next view
      res.locals.user = req.user
  }
  next();
}

module.exports = passport;
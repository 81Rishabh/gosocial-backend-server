const passport = require('passport');

const LocalStratergy = require('passport-local').Strategy;

// require User Modle
const User = require('./db/User');

passport.use(new LocalStratergy({
    usernameField : 'email',
},
   function (email , password , done) {
      User.findOne({email : email} , function(err , user){
           if(err) {
              console.log('Error in finding user --> passport', err);
              return done(err);
           }

           if(!user || password != user.password) {
               console.log("Invalid Username/Password");
               return done(null , false);
           }
           return done(null , user);
      })
   }
));


// serialzing the user to decide which key to be kept 
passport.serializeUser(function(user , done){
    done(null , user.id);
});

// deserialzing the user from the key in the cookie
passport.serializeUser(function(user , done){
   User.findById(id , function(err, user){
    if(err) {
        console.log('Error in finding user --> passport', err);
        return done(err);
     }
     return done(null , user);
   })
});

module.exports = passport;
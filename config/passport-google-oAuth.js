const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

passport.use(new GoogleStrategy(
    {
        clientID: '993050939473-71n2kqtelosgtvd441n9bf53vhs4437s.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:8000/users/auth/google/callback',
      } , function(accessToken, refreshToken, profile, done){
          
           User.findOne({email : profile.emails[0].value} , function(err , user){
               if(err) {
                   return console.log('Error in google stratergy-passport ' , err);
               }
    
               if(user) {
                //    if found set the user as a req.user.
                   return done(null , user);
               }
               else {
                // if not found  , craeate and set as req.user
                   User.create({
                       username : profile.displayName,
                       email : profile.emails[0],
                       password : crypto.randomBytes(20).toString('hex')
                   } , function(err , user) {
                       if(err) {
                          return console.log("Error in creating google-stratergy-passport: " , err);
                       }
    
                       return done(null , user);
                   })
               }
           })
      }
));

module.exports = passport;
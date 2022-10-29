const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// require User Model
const User = require('../models/users');

const opts = {
    jwtFromRequest :  ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey  : 'gosocial',
}

passport.use(new JWTStratergy(opts , function(jwtPayload , done){
    User.findById(jwtPayload._id , function(err, user){
        if(err) {
            console.log('error is finding user..!');
            return;
        }
        if(user) {
            return done(null, user);
        }
        else {
            return done(null , false);
        }
    })
}));

module.exports.passport;
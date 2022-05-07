const express  = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');
const passport = require('passport');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/SignUp' , userController.signUp);
router.get('/SignIn' , userController.signIn);

router.post('/create' , userController.create);

router.post('/create-session' ,passport.authenticate('local', { failureRedirect: '/users/SignIn' }), userController.createSession);

// google oAuth 
router.get('/auth/google' , passport.authenticate('google', {scope: ['profile' , 'email']}));
router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect : 'users/SignIn' }), userController.createSession)

router.get('/sign-out' , userController.distroySession);
module.exports = router;

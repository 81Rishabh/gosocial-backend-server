const express  = require('express');
const router = express.Router();
const passport = require('passport');
const authApi = require('../../../controller/api/v1/authentication_api');
const userController = require('../../../controller/api/v1/usersController');


router.get('/' , userController.getUsers);
router.post('/create_session' , authApi.createSession);
router.post('/create_user' , authApi.createUser); 
router.post('/update_profile/:userId' , passport.authenticate("jwt" , {session : false}) , authApi.update_Profile);
router.get('/users_profile/:userId' , userController.getUsersProfile);

module.exports = router;
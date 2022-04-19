const express  = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');

router.get('/profile', userController.profile);
router.get('/SignUp' , userController.signUp);
router.get('/SignIn' , userController.signIn);

router.post('/create' , userController.create);

module.exports = router;

const express  = require('express');
const router = express.Router();
const postController = require('../controller/post_controller');
const passport = require('passport');

router.post('/create-post', passport.checkAuthentication , postController.createPost);
router.get('/destroy/:id' , passport.checkAuthentication , postController.destroy);

module.exports = router;
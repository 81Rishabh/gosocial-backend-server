const express  = require('express');
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controller/api/v1/post_api');

router.get('/' , passport.authenticate("jwt" , {session : false}),  postApi.index);
router.post('/create_post' , passport.authenticate("jwt" , {session : false}), postApi.createPost);
router.delete('/destroy/:id' , passport.authenticate("jwt" , {session : false}), postApi.destroy);

module.exports = router;
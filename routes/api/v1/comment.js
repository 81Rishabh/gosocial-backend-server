const express  = require('express');
const router = express.Router();
const commentController = require('../../../controller/api/v1/comments');
const passport = require('passport');

router.post('/create' , passport.authenticate("jwt" , {session : false}) , commentController.create);

module.exports = router;
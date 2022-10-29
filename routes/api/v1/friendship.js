const express  = require('express');
const router = express.Router();
const friendshipController = require('../../../controller/api/v1/friendship');
const passport = require('passport');
// @post request
// route for creating friendship 
router.post('/create_friendship' ,passport.authenticate("jwt" , {session : false}) , friendshipController.createFriendship);
router.post('/remove_friendship' , passport.authenticate("jwt" , {session : false}) , friendshipController.removeFriendship);

module.exports = router;
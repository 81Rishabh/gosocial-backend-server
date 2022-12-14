const express  = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.use('/users' , require('./users'));
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comment'));
router.use('/likes' , require('./likes'));
router.use('/api' , require('./api'));

module.exports = router;
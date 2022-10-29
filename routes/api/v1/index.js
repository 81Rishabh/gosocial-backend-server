const express  = require('express');
const router = express.Router();

router.use('/users' , require('./users'));
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comment'));
router.use('/friendship' , require('./friendship'));

module.exports = router;
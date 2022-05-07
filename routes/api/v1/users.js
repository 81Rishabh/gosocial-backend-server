const express  = require('express');
const router = express.Router();
const authApi = require('../../../controller/api/v1/authentication_api');


router.post('/create-session' , authApi.createSession);



module.exports = router;
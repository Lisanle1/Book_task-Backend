const express = require('express');
const router = express.Router();
const userAuth = require('../controller/user.controller')
const Auth = require('../middleware/auth')
router.post('/signup' ,userAuth.signup)
router.post('/login', userAuth.login)

module.exports = router;
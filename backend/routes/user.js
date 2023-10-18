const express = require('express');
const router = express.Router();

//controllers functions 

const { loginUser, signupUser } = require('../Controllers/userController');

//login
router.post('/login', loginUser);

//signup 
router.post('/signup', signupUser);

module.exports = router;
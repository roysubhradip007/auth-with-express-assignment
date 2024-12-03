const express = require('express');
const {signup , login, getUser} = require('../controller/authController.js');
const signupDataValidate = require('../middleware/signupDataValidate.js');
const loginDataValidate = require('../middleware/loginDataValidate.js');
const authUser = require('../middleware/authUser.js');


const authRouter = express.Router();


authRouter.post('/signup',signupDataValidate , signup);
authRouter.post('/login', loginDataValidate, login);
authRouter.get('/', authUser, getUser);


module.exports = authRouter;
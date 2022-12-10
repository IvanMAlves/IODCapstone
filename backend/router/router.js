const express = require("express");

const userController = require("../controller/UserController");
const middleWare =  require("../middleware/VerifyToken");
const refreshToken = require("../controller/RefreshToken");

const router = express.Router();


router.get('/users/selectAllusers', middleWare.verifyTokens, userController.selectAllusers);
router.post('/users/login', userController.login);
router.post('/users/registerUser',userController.registerUser);
router.post('/users/logout',userController.logout);
router.get('/token', refreshToken.refreshToken);

 
module.exports = { router }
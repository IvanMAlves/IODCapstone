const express = require("express");

const userController = require("../controller/UserController");
const middleWare =  require("../middleware/VerifyToken");
const refreshToken = require("../controller/RefreshToken");
const ArmyController = require("../controller/ArmyController");
const UnitController = require("../controller/UnitController");

const router = express.Router();

//this is the route to test the user database and for Admin to see all the users
router.get('/users/selectAllusers', middleWare.verifyTokens, userController.selectAllusers);
//this is the route for users to login
router.post('/users/login', userController.login);
//this is the route for users to register
router.post('/users/registerUser',userController.registerUser);
//this is the route for users to logout
router.post('/users/logout',userController.logout);
//this is the route will run to refresh the token
router.get('/token', refreshToken.refreshToken);

//this is to create an army
router.post('/army/create',ArmyController.createArmy);
//this is to get the Army by userID
router.get('/army/getArmyByUser/:idusers', middleWare.verifyTokens, ArmyController.getArmyByUserId);
//this is to update the army by ArmyID
router.put('/army/updateArmybyID/:armyid', middleWare.verifyTokens, ArmyController.updateArmybyID);
//this is to delete the army by ArmyID
router.delete('/army/deleteArmyByID/:armyid', middleWare.verifyTokens, ArmyController.deleteArmyByID);


//this is to create a unit with the ArmyID
router.post('/units/create/:armyid', middleWare.verifyTokens, UnitController.createUnit);
//this is to get the Units by userID
router.get('/units/getUnitsByUserId/:armyid', middleWare.verifyTokens, UnitController.getUnitsByArmyId);
// //this is to update the army by ArmyID
// router.put('/units/updateArmybyID/:armyid', middleWare.verifyTokens, ArmyController.updateArmybyID);
// //this is to delete the army by ArmyID
// router.delete('/units/deleteArmyByID/:armyid', middleWare.verifyTokens, ArmyController.deleteArmyByID);

 
module.exports = { router }
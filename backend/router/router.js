const express = require("express");

const userController = require("../controller/UserController");
const middleWare =  require("../middleware/VerifyToken");
const refreshToken = require("../controller/RefreshToken");
const ArmyController = require("../controller/ArmyController");
const UnitController = require("../controller/UnitController");
const MatchController = require("../controller/MatchController");

const router = express.Router();

//should probably separate the below into separate routes files, so users.routes.js, army.routes.js, etc

//this is the route to test the user database and for Admin to see all the users
router.get('/users/selectAllusers', middleWare.verifyTokens, userController.selectAllusers);
//this is the route used to get all other users except the user logged in
router.get('/users/selectAllOtherUsers/:idusers', middleWare.verifyTokens, userController.selectAllOtherUsers);
//this is the route for users to login
router.post('/users/login', userController.login);
//this is the route for users to register
router.post('/users/registerUser',userController.registerUser);
//this is the route for users to logout
router.post('/users/logout',userController.logout);
//this is the route will run to refresh the token
router.get('/token', refreshToken.refreshToken);
//this is the route that will check the unique email
router.post('/users/checkUniqueEmail', userController.checkUniqueEmail);

//this is to create an army
router.post('/army/create', middleWare.verifyTokens,ArmyController.createArmy);
//this is to get the Army by userID
router.get('/army/getArmyByUser/:idusers', middleWare.verifyTokens, ArmyController.getArmyByUserId);
//this is to update the army by ArmyID
router.put('/army/updateArmybyID/:armyid', middleWare.verifyTokens, ArmyController.updateArmybyID);
//this is to delete the army by ArmyID
router.delete('/army/deleteArmyByID/:armyid', middleWare.verifyTokens, ArmyController.deleteArmyByID);


//this is to create a unit with the ArmyID
router.post('/units/createUnit/:armyid', middleWare.verifyTokens, UnitController.createUnit);
//this is to get the Units by ArmyID
router.get('/units/getUnitsByArmyId/:armyid', middleWare.verifyTokens, UnitController.getUnitsByArmyId);
//this is to get a single unit to edit
router.get('/units/getSingleUnitbyId/:unitid', middleWare.verifyTokens, UnitController.getSingleUnitbyId);
//this is to update the units by unitid
router.put('/units/updateUnitbyID/:unitid', middleWare.verifyTokens, UnitController.updateUnitbyID);
// //this is to delete the unit in an army by unitid
router.delete('/units/removeUnitFromArmyByUnitID/:unitid', middleWare.verifyTokens, UnitController.removeUnitFromArmyByUnitID);

//this is to create a match with the idusers
router.post('/matches/createMatch/:idusers', middleWare.verifyTokens, MatchController.createMatch);
//this is to get the matches by idusers
router.get('/matches/getMatchByUserID/:idusers', middleWare.verifyTokens, MatchController.getMatchByUserID);
//this is to update matches by idmatches
router.put('/matches/updateMatchByMatchID/:idmatches', middleWare.verifyTokens, MatchController.updateMatchByMatchID);

 
module.exports = { router }
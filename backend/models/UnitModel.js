"use strict";

const mysql = require("mysql2"); //required for connecting to the SQL Database
const config = require("../connection/config.js"); //Config also helps host the DB and accesses the details of the db

//examples of how you could add a model into your MVC structure
function Unit(unitName) {
    //keep the properties matching your column names exactly to simplify inserts
    this.unitname = unitName;
    this.unitexp = 0;
    this.honors = '';
    this.createdOn = new Date();
    this.UpdatedOn = new Date();
}

function ArmyUnit(armyId, unitId) {

    this.armyid = armyId,
    this.unitid = unitId
}

module.exports = {
    Unit,
    ArmyUnit
}
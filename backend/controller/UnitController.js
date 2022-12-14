"use strict";

const mysql = require("mysql2"); //required for connecting to the SQL Database
const config = require("../connection/config.js"); //Config also helps host the DB and accesses the details of the db

//creating a Unit and inserting into an army
exports.createUnit = async (req, res) => {
  const { unitname } = req.body;
  const armyid = req.params.armyid;

  try {
    const connection = mysql.createConnection(config);
    //we create the unit here, unfortunately can't do BEGIN to insert both
    let createUnitSQL = `INSERT INTO units (unitname, unitexp, honors, createdOn, UpdatedOn)
      VALUES("${unitname}" , 0 , ' ' , now() , now());`;
    connection.query(createUnitSQL, (error, results, fields) => {
      if (error) {
        throw Error(error.message);
      }
      let latestUnitId = results.insertId;
      //another SQL connection and Query to insert the latest unit into an Army
      let insertUnitIntoArmy = `INSERT INTO army_unit (armyid, unitid)
      VALUES (${armyid},${latestUnitId});`;
      const connection2 = mysql.createConnection(config);
      connection2.query(insertUnitIntoArmy, (error2, results2, fields2) => {
        if (error2) {
          throw Error(error2.message);
        }
        res.status(200);
        res.json({
          success: true,
          msg: "Unit Creation Successful and Inserted into Army",
        });
        connection2.end();
      });
    });
    connection.end();
  } catch (e) {
    res.status(400);
    res.json({ success: false, message: e.message });
    throw Error(e.message);
  }
};

//This method below is to get the army list of the user by ArmyID
exports.getUnitsByArmyId = async (req, res) => {
  try {
    //this const below will get the armyID from the client request
    const armyid = req.params.armyid;

    const connection = mysql.createConnection(config);
    let sql = `SELECT army_unit.unitid, units.unitname, units.unitexp, units.honors, units.UpdatedOn
            FROM army_unit 
            INNER JOIN units ON army_unit.unitid=units.unitid
            WHERE armyid=${armyid};`;

    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw Error(error.message);
      }
      res.status(200);
      console.log(results);
      res.json({ success: true, data: results });
    });
    connection.end();
  } catch (e) {
    res.status(400);
    res.json({ success: false, message: e.message });
    throw Error(e.message);
  }
};

exports.getSingleUnitbyId = async (req, res) => {
  try {
    //this const below will get the unitid from the client request
    const singleunitid = req.params.unitid; 

    const connection = mysql.createConnection(config);
    let getSingleUnitSql = `SELECT * FROM units WHERE unitid=${singleunitid};`;
    console.log(getSingleUnitSql);
    connection.query(getSingleUnitSql, (error, results, fields) => {
      if (error) {
        throw Error(error.message);
      }
      res.status(200);
      //console.log(results);
      res.json({ success: true, data: results });
    });
    connection.end();
  } catch (e) {
    res.status(400);
    res.json({ success: false, message: e.message });
    throw Error(e.message);
  }
};

//updating the Unit fields by ID
exports.updateUnitbyID = async (req, res) => {
    const { unitexp, honors } = req.body;
    try {
      //this const below will get the unitid from the client request
      const unitid = req.params.unitid; 

      const connection = mysql.createConnection(config);
      let updateUnitbyIDSql = `UPDATE units
      SET unitexp=${unitexp}, honors ='${honors}', UpdatedOn=now() 
      WHERE unitid=${unitid};`;
      console.log(updateUnitbyIDSql);
      connection.query(updateUnitbyIDSql, (error, results, fields) => {
        if (error) {
          throw Error(error.message);
        }
        res.status(200);
        //console.log(results);
        res.json({ success: true, data: results });
      });
      connection.end();
    } catch (e) {
      res.status(400);
      res.json({ success: false, message: e.message });
      throw Error(e.message);
    }
  };

  //deleted the units from 
exports.removeUnitFromArmyByUnitID = async (req, res) => {
  //const { unitexp, honors } = req.body;
  try {
    //this const below will get the unitID from the client request
    const unitid = req.params.unitid; 

    const connection = mysql.createConnection(config);
    let removeUnitFromArmyByUnitIDSql = `DELETE army_unit, units
    FROM   army_unit
    JOIN   units ON units.unitid = army_unit.unitid
    WHERE  army_unit.unitid = ${unitid};`;
    console.log(removeUnitFromArmyByUnitIDSql);
    connection.query(removeUnitFromArmyByUnitIDSql, (error, results, fields) => {
      if (error) {
        throw Error(error.message);
      }
      res.status(200);
      console.log(results);
      res.json({ success: true, data: results });
    });
    connection.end();
  } catch (e) {
    res.status(400);
    res.json({ success: false, message: e.message });
    throw Error(e.message);
  }
  };

"use strict";
//const { request } = require("express");
const mysql = require("mysql2"); //required for connecting to the SQL Database
const config = require("../connection/config.js"); //Config also helps host the DB and accesses the details of the db

//creating an army
exports.createArmy = async (req, res) => {
  const { idusers, armyname } = req.body;
  try {
    //connecting to the DB
    const connection = mysql.createConnection(config);
    let createArmySQL = `INSERT INTO armies
        (idusers,
        armyname,
        requisition,
        createdOn,
        updatedOn)
        VALUES
        ("${idusers}", "${armyname}", 0 , now() , now());`;
    connection.query(createArmySQL, (error, results, fields) => {
      if (error) {
        throw Error(error.message);
      }
      res.status(200);
      res.json({ success: true, msg: "Army Creation Successful" });
    });

    connection.end();
  } catch (e) {
    res.status(400);
    res.json({ success: false, message: e.message });
    throw Error(e.message);
  }
  console.log();
};

//reading the db
exports.getArmyByUserId = async (req, res) => {
  try {
    //this const below will get the userID from the client request
    const userIdValue = req.params.idusers;

    const connection = mysql.createConnection(config);
    let sql = `SELECT u.idusers, u.username, a.armyid, a.armyname, a.requisition, a.updatedOn  
    FROM users AS u, armies AS a 
    WHERE u.idusers = a.idusers
    AND u.idusers = ${userIdValue};`;

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

//updating the army fields by ID
exports.updateArmybyID = async (req, res) => {
    const { requisition } = req.body;
    try {
      //this const below will get the userID from the client request
      const armyid = req.params.armyid;
  
      const connection = mysql.createConnection(config);
      let sql = `UPDATE armies
      SET
      requisition = ${requisition},
      updatedOn = now()
      WHERE armyid = ${armyid};`;
  
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

  exports.deleteArmyByID = async (req, res) => {
    try {
      //this const below will get the userID from the client request
      const armyid = req.params.armyid;
  
      const connection = mysql.createConnection(config);
      let sql = `UPDATE armies
      SET
      requisition = 1,
      updatedOn = now()
      WHERE armyid = ${armyid};`;
  
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
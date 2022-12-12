"use strict";
//const { request } = require("express");
const mysql = require("mysql2"); //required for connecting to the SQL Database
const config = require("../connection/config.js"); //Config also helps host the DB and accesses the details of the db


exports.createMatch = async (req, res) => {
  const userIdValue = req.params.idusers
    const { idusers, matchname } = req.body;
    try {
      //connecting to the DB
      const connection = mysql.createConnection(config);
      let createMatchsql = `INSERT INTO matches(createddate, matchname, idattacker, iddefender,matchresult) 
      VALUES(now(),"${matchname}",${userIdValue},${idusers},'Match yet to be played');`;
      connection.query(createMatchsql, (error, results, fields) => {
        if (error) {
          throw Error(error.message);
        }
        res.status(200);
        res.json({ success: true, msg: "Match Creation Successful" });
      });
      //console.log(result);
      connection.end();
    } catch (e) {
      res.status(400);
      res.json({ success: false, message: e.message });
      throw Error(e.message);
    }
  };
  
  //reading the db
  exports.getMatchByUserID = async (req, res) => {
    try {
      //this const below will get the userID from the client request
      const userIdValue = req.params.idusers;
  
      const connection = mysql.createConnection(config);
      let getMatchByUserIDSql = `SELECT 
      m.idmatches, 
      m.matchname, 
      u.username as 'attacker', 
      u1.username as 'defender',
      m.createddate,
      m.dateplayed,
      m.matchresult
      FROM matches as m
      JOIN users as u ON u.idusers = m.idattacker
      JOIN users as u1 ON u1.idusers = m.iddefender
      WHERE u.idusers = ${userIdValue} OR u1.idusers = ${userIdValue};`;
      
      connection.query(getMatchByUserIDSql, (error, results, fields) => {
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

  
  //updating the army fields by ID
  exports.updateMatchByMatchID = async (req, res) => {
      const { matchresult } = req.body;
      try {
        //this const below will get the userID from the client request
        const idmatches = req.params.idmatches;
    
        const connection = mysql.createConnection(config);
        let updateMatchByMatchIDSql = `UPDATE matches
        SET matchresult = "${matchresult}", dateplayed = now()
        WHERE idmatches = ${idmatches};`;
        console.log(updateMatchByMatchIDSql);
        connection.query(updateMatchByMatchIDSql, (error, results, fields) => {
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

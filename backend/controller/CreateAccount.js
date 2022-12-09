"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");

exports.createUser = async (req, res) => {
    try {
      const connection = mysql.createConnection(config);
      let sql = `INSERT INTO daboyzhobbycorner.users
      ('useremail',
      'password',
      'username',
      'accountcreated')
      VALUES ("unleashediv@gmail.com", "test123","Unleashed",now());`;
  
      connection.query(sql, (error, results, fields) => {
        if (error) {
          throw Error(error.message);
        }
        res.status(200);
        res.json({ success: true, data: results });
      });
  
      connection.end();
    } catch (e) {
      res.status(400);
      res.json({ success: false, message: e.message });
      throw Error(e.message);
    }
  };
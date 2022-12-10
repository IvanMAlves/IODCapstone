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

// //this needs to be used when I am inserting information into multiple tables
// exports.getUnitsByUserId = async (req, res) => {
//   try {
//     //this const below will get the userID from the client request
//     const userIdValue = req.params.idusers;

//     const connection = mysql.createConnection(config);
//     let sql = `SELECT u.idusers, u.username, a.armyid, a.armyname, a.requisition, a.updatedOn
//     FROM users AS u, armies AS a
//     WHERE u.idusers = a.idusers
//     AND u.idusers = ${userIdValue};`;

//     connection.query(sql, (error, results, fields) => {
//       if (error) {
//         throw Error(error.message);
//       }
//       res.status(200);
//       console.log(results);
//       res.json({ success: true, data: results });
//     });
//     connection.end();
//   } catch (e) {
//     res.status(400);
//     res.json({ success: false, message: e.message });
//     throw Error(e.message);
//   }
// };

// //updating the army fields by ID
// exports.updateArmybyID = async (req, res) => {
//     const { requisition } = req.body;
//     try {
//       //this const below will get the userID from the client request
//       const armyid = req.params.armyid;

//       const connection = mysql.createConnection(config);
//       let sql = `UPDATE armies
//       SET
//       requisition = ${requisition},
//       updatedOn = now()
//       WHERE armyid = ${armyid};`;

//       connection.query(sql, (error, results, fields) => {
//         if (error) {
//           throw Error(error.message);
//         }
//         res.status(200);
//         console.log(results);
//         res.json({ success: true, data: results });
//       });
//       connection.end();
//     } catch (e) {
//       res.status(400);
//       res.json({ success: false, message: e.message });
//       throw Error(e.message);
//     }
//   };

//   exports.deleteArmyByID = async (req, res) => {
//     try {
//       //this const below will get the userID from the client request
//       const armyid = req.params.armyid;

//       const connection = mysql.createConnection(config);
//       let sql = `DELETE FROM armies
//                 WHERE armyid = ${armyid};`;

//       connection.query(sql, (error, results, fields) => {
//         if (error) {
//           throw Error(error.message);
//         }
//         res.status(200);
//         console.log(results);
//         res.json({ success: true, data: results });
//       });
//       connection.end();
//     } catch (e) {
//       res.status(400);
//       res.json({ success: false, message: e.message });
//       throw Error(e.message);
//     }
//   };

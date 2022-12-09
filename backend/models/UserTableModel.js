"use strict";
const mysql = require("mysql2");
const config = require("../connection/config.js");

// constructor
const UserTable = function (users) {
  this.id = users.idusers;
  this.useremail = users.useremail;
  this.password = users.password;
  this.username = users.username;
  this.accountcreated = users.accountcreated;

};


UserTable.findAccount = (req, result) => {

};


// UserTable.createAccount = (req, result) => {
//   let idusers = req.params.id;
//   if(!idusers) {
//     throw new Error("Unable to get the file Id");
//   }
//   let body = req.body;
//   let release_year = body.release_year;
//   let username = body.username;
//   let useremail = body.useremail;
  
//   return new Promise((resolve, reject) => {
//     let query = `UPDATE film
//         SET release_year = ${release_year}
//         WHERE film_id = ${filmId}`;
//     console.log(query);
//     db.query(query, (err, res) => {
//       if (err) {
//         reject(new Error("Unable to update film"));
//       }

//       resolve({
//         message: "Update successfully",
//         success: true,
//         data: res,
//       });
//     });
//   });
// };

module.exports = UserTable;

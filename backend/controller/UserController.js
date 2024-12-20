"use strict";
const bcrypt = require("bcrypt");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2"); //required for connecting to the SQL Database
const config = require("../connection/config.js"); //Config also helps host the DB and accesses the details of the db

exports.registerUser = async (req, res) => {
  const { useremail, password, username, confPassword } = req.body;

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const connection = mysql.createConnection(config);
    let sql = `INSERT INTO users
    (useremail,
    password,
    username,
    createdAt)
    VALUES
    ("${useremail}", "${hashPassword}", "${username}",now());`;

    connection.query(sql, (error, results, fields) => {
      if (error) {
        throw Error(error.message);
      }
      res.status(200);
      res.json({ success: true, msg: "Registration Successful" });
    });

    connection.end();
  } catch (e) {
    res.status(400);
    res.json({ success: false, message: e.message });
    throw Error(e.message);
  }
};

//new method to check unique email
exports.checkUniqueEmail = async (req, res) => {
  try {
    const { useremail } = req.body
    const connection = mysql.createConnection(config);
    let sql = `SELECT * FROM users WHERE useremail = "${useremail}";`;

    connection.query(sql, (error, results, fields) => {
      //error here
      if (error) {
        throw Error(error.message);
      }
      if (results.length > 0) {
        res.status(400);
        res.json({ success: false, msg: "Email already exists" });
      } else {
        res.status(200);
        res.json({ success: true, msg: "Email is unique" });
      }
    }); //error here
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Email is already in use" });
  }
};


exports.login = async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const connection = mysql.createConnection(config);
    let sql = `SELECT * FROM users WHERE useremail = "${useremail}";`;

    let emailQueryResult = await new Promise((resolve, reject) => {
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(new Error("Unable to get query by email"));
        }
        resolve({
          message: "Getting email successful",
          success: true,
          data: results,
        });
      });
    });
    connection.end();

    const match = await bcrypt.compare(
      req.body.password,
      emailQueryResult.data[0].password
    );
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const idusers = emailQueryResult.data[0].idusers;
    const username = emailQueryResult.data[0].username;
    const loginuseremail = emailQueryResult.data[0].useremail;
    const accessToken = jwt.sign(
      { idusers, username, loginuseremail },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { idusers, username, loginuseremail },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    let emailQueryUpdate = await new Promise((resolve, reject) => {
      const connection = mysql.createConnection(config);
      let sql = `UPDATE users SET refreshtoken = "${refreshToken}" WHERE idusers = "${idusers}";`;
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(new Error("Refresh token failed"));
        }
        resolve({
          message: "Refresh token successful",
          success: true,
          data: results,
        });
      });
      connection.end();
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200);
    res.json({ success: true, msg: "Log in successful", token: accessToken });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Email or Password not correct" });
  }
};

exports.logout = async (req, res) => {
  const { idusers } = req.body;

  const connection = mysql.createConnection(config);
  let sql = `SELECT * FROM users WHERE idusers = "${idusers}";`;

  let userQuery = await new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(new Error("Unable to get query by token or id"));
      }

      resolve({
        message: "successful",
        success: true,
        data: results,
      });
    });
  });

  connection.end();

  if (!idusers) return res.sendStatus(204);

  let clearRefreshtoken = await new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    let sql = `UPDATE users SET refreshtoken = NULL WHERE idusers = ${idusers};`;
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(new Error("Logout Error"));
      }
      resolve({
        message: "Logout Successful",
        success: true,
        data: results,
      });
    });
    connection.end();
  });

  res.status(200);
  res.json({ success: true, msg: "Logout successful" });
};

//this method selects all users
exports.selectAllusers = async (req, res) => {
  try {
    const connection = mysql.createConnection(config);
    let sql = `SELECT idusers, useremail, username, createdAt FROM users;`;
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
    throw e;
  }
};

//this method selects all users except the user that is logged in
exports.selectAllOtherUsers = async (req, res) => {
  const idusers = req.params.idusers;
  try {
    const connection = mysql.createConnection(config);
    let sql = `SELECT idusers, username FROM users WHERE idusers != ${idusers};`;

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
    throw e;
  }
};

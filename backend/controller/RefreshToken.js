//import Users from "../models/UserModel.js";
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const config = require("../connection/config.js");

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const connection = mysql.createConnection(config);
    let sql = `SELECT * FROM users WHERE refreshtoken = "${refreshToken}";`;

    let userRefresh = await new Promise((resolve, reject) => {
      connection.query(sql, (error, results, fields) => {
        if (error) {
          reject(new Error("Unable to Refresh the token"));
        }
        resolve({
          message: "Refresh Token Successful",
          success: true,
          data: results,
        });
      });
    });
    connection.end();

    if (!userRefresh) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = userRefresh.data[0].idusers;
        const userName = userRefresh.data[0].username;
        const userEmail = userRefresh.data[0].useremail;
        const accessToken = jwt.sign(
          { userId, userName, userEmail },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

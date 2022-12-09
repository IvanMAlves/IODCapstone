"use strict";

module.exports = (app) => {

  const userController = require("../controller/UserController");


  app.get("/", (req, res) => {
    res.send("Main Page");
  });

  app
  .route("/users/selectAllusers")
  .get(userController.selectAllusers);

  app
  .route("/users/registerUser")
  .post(userController.registerUser);

  app
  .route("/users/login")
  .post(userController.login);

  app
  .route("/users/logout")
  .post(userController.logout);

  app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found on the server</h1>");
  });
};
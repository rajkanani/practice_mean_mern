const express = require("express");

const routes = express.Router();

const authRoute = require("./auth");
const taskRoute = require("./task");

// import main routes
routes.use("/auth", authRoute);
routes.use("/task", taskRoute);

routes.get("/", function (req, res, msg) {
  res.status(200).json({success: true,message: "Welcome To Prac by R A J, API is running on v1",});
});

module.exports = routes;

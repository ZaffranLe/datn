const express = require("express");
const authController = require("../api/controller/auth-controller");

const genderRouter = require("./gender");

const router = express.Router();

router.post("/login", authController.login);

router.use("/gender", genderRouter);

module.exports = router;

const express = require('express');
const authController = require("../api/controller/auth-controller");
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Success");
});

router.post("/login", authController.login);

module.exports = router;
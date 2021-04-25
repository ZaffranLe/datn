const express = require("express");
const authController = require("../api/controller/auth-controller");

const genderRouter = require("./gender");

const router = express.Router();

router.get("/test-api", (req, res) => {
    res.json(true);
});

router.post("/login", authController.login);
router.post("/register", authController.register, authController.login);

router.use("/gender", genderRouter);

module.exports = router;

const express = require("express");
const authController = require("../api/controller/auth-controller");

const genderRouter = require("./gender");
const hobbyRouter = require("./hobby");
const preferenceRouter = require("./preference");
const userRouter = require("./user");
const provinceRouter = require("./province");

const router = express.Router();

router.get("/test-api", (req, res) => {
    res.json(true);
});

router.post("/login", authController.login);
router.post("/refresh-token", authController.getTokenByRefreshToken);
router.post("/register", authController.register, authController.login);

router.use("/gender", genderRouter);
router.use("/hobby", hobbyRouter);
router.use("/preference", preferenceRouter);
router.use("/user", userRouter);
router.use("/province", provinceRouter);

module.exports = router;

const express = require("express");
// controllers
const authController = require("../api/controller/auth-controller");
// routers
const genderRouter = require("./gender");
const hobbyRouter = require("./hobby");
const preferenceRouter = require("./preference");
const userRouter = require("./user");
const provinceRouter = require("./province");
// etc
const verifyToken = require("../api/middleware/verify-token");

const router = express.Router();

router.get("/test-api", (req, res) => {
    res.json(true);
});

router.post("/login", authController.login);
router.post("/refresh-token", authController.getTokenByRefreshToken);
router.post("/register", authController.register, authController.login);
router.post("/logout", verifyToken, authController.logout);

router.use("/gender", genderRouter);
router.use("/hobby", hobbyRouter);
router.use("/preference", preferenceRouter);
router.use("/user", userRouter);
router.use("/province", provinceRouter);

module.exports = router;

const express = require("express");
// controllers
const authController = require("../api/controller/auth-controller");
// routers
const fileRouter = require("./file");
const genderRouter = require("./gender");
const hobbyRouter = require("./hobby");
const preferenceRouter = require("./preference");
const userRouter = require("./user");
const provinceRouter = require("./province");
const postRouter = require("./post");
// etc
const verifyToken = require("../api/middleware/verify-token");

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh-token", authController.getTokenByRefreshToken);
router.post("/register", authController.register, authController.login);
router.post("/logout", verifyToken, authController.logout);

router.use("/file", fileRouter);
router.use("/gender", genderRouter);
router.use("/hobby", hobbyRouter);
router.use("/preference", preferenceRouter);
router.use("/user", userRouter);
router.use("/province", provinceRouter);
router.use("/post", postRouter);

module.exports = router;

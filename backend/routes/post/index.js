const verifyToken = require("../../api/middleware/verify-token");
const postController = require("../../api/controller/post-controller");
const express = require("express");
const router = express.Router();

router.get("/user/:id", postController.getByUserId);
router.post("/", verifyToken, postController.create);

module.exports = router;
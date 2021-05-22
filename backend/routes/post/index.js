const verifyToken = require("../../api/middleware/verify-token");
const postController = require("../../api/controller/post-controller");
const express = require("express");
const router = express.Router();

router.get("/user/:id", verifyToken, postController.getByUserId);
router.post("/", verifyToken, postController.create);
router.post("/like", verifyToken, postController.changeLikeStatus);

module.exports = router;

const verifyToken = require("../../api/middleware/verify-token");
const postController = require("../../api/controller/post-controller");
const express = require("express");
const router = express.Router();

router.get("/user/:id", verifyToken, postController.getByUserId);
router.get("/:id", verifyToken, postController.getById);
router.delete("/:id", verifyToken, postController.deleteById);
router.post("/", verifyToken, postController.create);
router.post("/comment", verifyToken, postController.submitCommentToPost);
router.post("/like", verifyToken, postController.changeLikeStatus);

module.exports = router;

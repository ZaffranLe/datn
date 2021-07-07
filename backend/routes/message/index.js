const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const messageController = require("../../api/controller/message-controller");
const router = express.Router();

router.post("/get-latest", verifyToken, messageController.getLatestMessages);
router.get("/url/:slug", verifyToken, messageController.getMessagesBySlug);
router.post("/", verifyToken, messageController.sendMessage);

module.exports = router;

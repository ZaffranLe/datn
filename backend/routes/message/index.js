const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const messageController = require("../../api/controller/message-controller");
const router = express.Router();

router.get("/", verifyToken, messageController.getLatestMessages);
router.get("/slug/:slug", verifyToken, messageController.getMessagesBySlug);

module.exports = router;

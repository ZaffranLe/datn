const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const messageController = require("../../api/controller/message-controller");
const router = express.Router();

router.get("/", messageController.getLatestMessages);

module.exports = router;

const fileController = require("../../api/controller/file-controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images", preservePath: true });

router.post("/upload", upload.array("files", 10), fileController.uploadFiles);

module.exports = router;

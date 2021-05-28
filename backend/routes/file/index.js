const fileController = require("../../api/controller/file-controller");
const verifyToken = require("../../api/middleware/verify-token");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4 } = require("uuid");
const commonCfg = require("../../config/common.cfg");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, commonCfg.filePath);
    },
    filename: function (req, file, cb) {
        cb(null, `${v4()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.post("/upload/image", verifyToken, upload.array("images", 10), fileController.uploadImages);
router.get("/image/:id", verifyToken, fileController.getImage);
router.post("/image/get-list", verifyToken, fileController.getImages);
router.get("/image/user/:id", verifyToken, fileController.getImageByUserId);

module.exports = router;

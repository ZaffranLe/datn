const fileController = require("../../api/controller/file-controller");
const verifyToken = require("../../api/middleware/verify-token");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { v4 } = require("uuid");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${v4()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.post("/upload/image", upload.array("images", 10), fileController.uploadImages);
router.get("/image/:id", fileController.getImage);
router.get("/image/user/:id", fileController.getImageByUserId);

module.exports = router;

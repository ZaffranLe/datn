const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const provinceController = require("../../api/controller/province-controller");
const router = express.Router();

router.get("/", verifyToken, provinceController.getAll);
router.get("/:id", verifyToken, provinceController.getById);
router.post("/", verifyToken, provinceController.create);
router.put("/:id", verifyToken, provinceController.update);
router.delete("/:id", verifyToken, provinceController.remove);

module.exports = router;

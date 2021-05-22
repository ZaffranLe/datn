const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const hobbyController = require("../../api/controller/hobby-controller");
const router = express.Router();

router.get("/", verifyToken, hobbyController.getAll);
router.get("/:id", verifyToken, hobbyController.getById);
router.post("/", verifyToken, hobbyController.create);
router.put("/:id", verifyToken, hobbyController.update);
router.delete("/:id", verifyToken, hobbyController.remove);

module.exports = router;

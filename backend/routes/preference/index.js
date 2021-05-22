const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const preferenceController = require("../../api/controller/preference-controller");
const router = express.Router();

router.get("/", verifyToken, preferenceController.getAll);
router.get("/:id", verifyToken, preferenceController.getById);
router.post("/", verifyToken, preferenceController.create);
router.put("/:id", verifyToken, preferenceController.update);
router.delete("/:id", verifyToken, preferenceController.remove);

module.exports = router;

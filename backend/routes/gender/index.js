const express = require("express");
const verifyToken = require("../../api/middleware/verify-token");
const genderController = require("../../api/controller/gender-controller");
const router = express.Router();

router.get("/", verifyToken, genderController.getAll);
router.get("/:id", verifyToken, genderController.getById);
router.post("/", verifyToken, genderController.create);
router.put("/:id", verifyToken, genderController.update);
router.delete("/:id", verifyToken, genderController.remove);

module.exports = router;

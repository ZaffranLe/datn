const express = require("express");
const preferenceController = require("../../api/controller/preference-controller");
const router = express.Router();

router.get("/", preferenceController.getAll);
router.get("/:id", preferenceController.getById);
router.post("/", preferenceController.create);
router.put("/:id", preferenceController.update);
router.delete("/:id", preferenceController.remove);

module.exports = router;

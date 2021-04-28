const express = require("express");
const genderController = require("../../api/controller/gender-controller");
const router = express.Router();

router.get("/", genderController.getAll);
router.get("/:id", genderController.getById);
router.post("/", genderController.create);
router.put("/:id", genderController.update);
router.delete("/:id", genderController.remove);

module.exports = router;

const express = require("express");
const provinceController = require("../../api/controller/province-controller");
const router = express.Router();

router.get("/", provinceController.getAll);
router.get("/:id", provinceController.getById);
router.post("/", provinceController.create);
router.put("/:id", provinceController.update);
router.delete("/:id", provinceController.remove);

module.exports = router;

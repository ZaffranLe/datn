const express = require("express");
const hobbyController = require("../../api/controller/hobby-controller");
const router = express.Router();

router.get("/", hobbyController.getAll);
router.get("/:id", hobbyController.getById);
router.post("/", hobbyController.create);
router.put("/:id", hobbyController.update);
router.delete("/:id", hobbyController.remove);

module.exports = router;

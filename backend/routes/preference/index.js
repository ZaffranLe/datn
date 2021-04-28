const express = require("express");
const genderController = require("../../api/controller/gender-controller");
const router = express.Router();

router.get("/", genderController.getAll);

module.exports = router;

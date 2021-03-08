var express = require('express');
var router = express.Router();

router.get("/test", (req, res) => {
    res.send("Success");
})

module.exports = router;
var express = require('express');
var router = express.Router();
var apiRouter = require('./apiRoute');

router.use('/api', apiRouter)

module.exports = router;

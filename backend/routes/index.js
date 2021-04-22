const express = require('express');
const router = express.Router();
const apiRouter = require('./api-route');

router.use('/api', apiRouter)

module.exports = router;

const Base = require("../mysql-base");
const dbConfig = require("../../../config/database.cfg");
let config = dbConfig[dbConfig.environment].mysql;

module.exports = new Base(console, config);
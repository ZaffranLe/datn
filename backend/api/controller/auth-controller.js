const jwt = require("jsonwebtoken");
const md5 = require("md5");
const mysqlUser = require("../../database/mysql/facade/user");
const { UserError } = require("../../common/utils/custom-errors");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function login(req, res) {
    try {
        res.status(200).json({
            data: {},
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, login.name);
    }
}

async function register(req, res) {
    try {
        const { email, password } = req.body;
        const encryptedPassword = md5(password);
        const userExist = await mysqlUser.getUserByEmail(email);
        if (!userExist) {
        } else {
            throw UserError("Email is invalid", "EMAIL_INVALID");
        }
        res.status(200).json({});
    } catch (e) {
        res.sendError(e, FILE_NAME < register.name);
    }
}

module.exports = {
    login,
};

const mysqlUser = require("../../database/mysql/facade/user");
const { UserError } = require("../../common/utils/custom-errors");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.cfg");

async function updateSelf(req, res) {
    try {
        const user = req.user;
        const _newUserInfo = await mysqlUser.update(user.id, req.body);
        delete _newUserInfo["password"];
        delete _newUserInfo["createdAt"];
        const token = jwt.sign(JSON.parse(JSON.stringify(_newUserInfo)), jwtConfig.tokenSecret, {
            expiresIn: jwtConfig.tokenLife,
        });
        res.status(200).json({ data: token, message: null });
    } catch (e) {
        res.sendError(e, FILE_NAME, updateSelf.name);
    }
}

async function checkSlugExist(req, res) {
    try {
        const { slug } = req.body;
        const slugExist = await mysqlUser.checkSlugExist(slug);
        let _available = true;
        if (slugExist) {
            _available = false;
        }
        res.status(200).json({
            data: _available,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, checkSlugExist.name);
    }
}

async function getUserBySlug(req, res) {
    try {
        const { slug } = req.params;
        let user = await mysqlUser.getUserBySlug(slug);
        user = await mysqlUser.getUserById(user.id);
        res.status(200).json({
            data: user,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getUserBySlug.name);
    }
}

module.exports = {
    updateSelf,
    checkSlugExist,
    getUserBySlug,
};

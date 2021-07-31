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

async function getUserBasicInfoBySlug(req, res) {
    try {
        const { slug } = req.params;
        let user = await mysqlUser.getUserBySlug(slug);
        user = await mysqlUser.getUserBasicInfoById(user.id);
        res.status(200).json({
            data: user,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getUserBySlug.name);
    }
}

async function getUserBasicInfoById(req, res) {
    try {
        const { id } = req.params;
        user = await mysqlUser.getUserBasicInfoById(id);
        res.status(200).json({
            data: user,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getUserBySlug.name);
    }
}

async function checkFollowUser(req, res) {
    try {
        const from = req.user.id;
        const to = req.params.id;
        const isFollowing = await mysqlUser.checkFollowUser(from, to);
        res.status(200).json({
            data: Boolean(isFollowing),
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, checkFollowUser.name);
    }
}

async function changeFollowUser(req, res) {
    try {
        const from = req.user.id;
        const to = req.body.id;
        const isFollowing = await mysqlUser.changeFollowUser(from, to);
        res.status(200).json({
            data: isFollowing,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, changeFollowUser.name);
    }
}

async function changeSkipUser(req, res) {
    try {
        const from = req.user.id;
        const to = req.body.id;
        const isSkipped = await mysqlUser.changeSkipUser(from, to);
        res.status(200).json({
            data: isSkipped,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, changeSkipUser.name);
    }
}

async function getUserSuggestions(req, res) {
    try {
        const { id: idUser } = req.user;
        const suggestions = await mysqlUser.getUserSuggestions(idUser);
        res.status(200).json({
            data: suggestions,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getUserSuggestions.name);
    }
}

async function searchUser(req, res) {
    try {
        const { name } = req.query;
        const users = await mysqlUser.searchUser(name);
        res.status(200).json({
            data: users,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, searchUser.name);
    }
}

module.exports = {
    updateSelf,
    checkSlugExist,
    getUserBySlug,
    checkFollowUser,
    changeFollowUser,
    changeSkipUser,
    getUserSuggestions,
    getUserBasicInfoBySlug,
    getUserBasicInfoById,
    searchUser,
};

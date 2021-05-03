const { UserError } = require("../../common/utils/custom-errors");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.cfg");
const mysqlUser = require("../../database/mysql/facade/user");
async function verifyToken(req, res, next) {
    try {
        const token = req.headers.token;
        try {
            const decoded = jwt.verify(token, jwtConfig.tokenSecret);
            const userExist = await mysqlUser.getUserById(decoded.id);
            if (userExist) {
                req.user = decoded;
                next();
            } else throw new UserError("User does not exist", "USER_NOT_EXIST");
        } catch (e) {
            res.status(401).json({
                data: {},
                message: "Token is invalid",
            });
        }
    } catch (e) {
        res.sendError(e, "middleware", verifyToken.name);
    }
}

module.exports = verifyToken;

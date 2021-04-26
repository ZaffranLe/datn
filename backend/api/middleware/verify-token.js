const { UserError } = require("../../common/utils/custom-errors");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.cfg");
async function verifyToken(req, res, next) {
    try {
        const token = req.headers.token;
        try {
            const decoded = jwt.verify(token, jwtConfig.tokenSecret);
            req.user = decoded;
            next();
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

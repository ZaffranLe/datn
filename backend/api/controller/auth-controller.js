const jwt = require("jsonwebtoken");
const md5 = require("md5");
const mysqlUser = require("../../database/mysql/facade/user");
const { UserError } = require("../../common/utils/custom-errors");
const _ = require("lodash");
const jwtConfig = require("../../config/jwt.cfg");
const sha = require("sha.js");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const encryptedPassword = md5(password);
        const userExist = await mysqlUser.getUserByEmail(email);
        if (!userExist || !_.isEqual(userExist["password"], encryptedPassword)) {
            throw new UserError("Sai email hoặc mật khẩu, vui lòng kiểm tra lại.", "WRONG_EMAIL_OR_PASSWORD");
        }
        delete userExist["password"];
        delete userExist["createdAt"];
        const token = jwt.sign(JSON.parse(JSON.stringify(userExist)), jwtConfig.tokenSecret, {
            expiresIn: jwtConfig.tokenLife,
        });
        const refreshToken = jwt.sign({ email: email, id: userExist.id }, jwtConfig.refreshTokenSecret, {
            expiresIn: jwtConfig.refreshTokenLife,
        });
        const { iat, exp } = jwt.decode(refreshToken);
        const rtInfo = {
            refreshToken: sha("sha256").update(refreshToken).digest("hex"),
            issuedAt: new Date(iat * 1000),
            expiredAt: new Date(exp * 1000),
            ip: req.socket.remoteAddress,
            idUser: userExist["id"],
        };
        await mysqlUser.insertRefreshToken(rtInfo);
        res.status(200).json({
            data: {
                token,
                refreshToken,
            },
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, login.name);
    }
}

async function register(req, res, next) {
    try {
        const { email, password } = req.body;
        const userExist = await mysqlUser.getUserByEmail(email);
        if (!userExist) {
            const encryptedPassword = md5(password);
            const now = new Date();
            const info = {
                email,
                password: encryptedPassword,
                createdAt: now,
            };
            const createdUserId = await mysqlUser.register(info);
            if (createdUserId) {
                next();
            } else {
                throw new Error("Đăng ký không thành công, vui lòng thử lại sau", "REGISTER_FAILED");
            }
        } else {
            throw new UserError("Email không hợp lệ, vui lòng chọn email khác", "EMAIL_INVALID");
        }
    } catch (e) {
        res.sendError(e, FILE_NAME < register.name);
    }
}

module.exports = {
    login,
    register,
};

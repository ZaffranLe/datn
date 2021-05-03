const jwt = require("jsonwebtoken");
const md5 = require("md5");
const mysqlUser = require("../../database/mysql/facade/user");
const mysqlRefreshToken = require("../../database/mysql/facade/refresh-token");
const { UserError } = require("../../common/utils/custom-errors");
const _ = require("lodash");
const jwtConfig = require("../../config/jwt.cfg");
const sha = require("sha.js");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const encryptedPassword = md5(password);
        let userExist = await mysqlUser.getUserByEmail(email);
        if (!userExist || !_.isEqual(userExist["password"], encryptedPassword)) {
            throw new UserError(
                "Sai email hoặc mật khẩu, vui lòng kiểm tra lại.",
                "WRONG_EMAIL_OR_PASSWORD"
            );
        }
        userExist = await mysqlUser.getUserById(userExist.id);
        delete userExist["password"];
        delete userExist["createdAt"];
        const token = jwt.sign(JSON.parse(JSON.stringify(userExist)), jwtConfig.tokenSecret, {
            expiresIn: jwtConfig.tokenLife,
        });
        const refreshToken = jwt.sign(
            { email: email, id: userExist.id },
            jwtConfig.refreshTokenSecret,
            {
                expiresIn: jwtConfig.refreshTokenLife,
            }
        );
        const { iat, exp } = jwt.decode(refreshToken);
        const rtInfo = {
            refreshToken: sha("sha256").update(refreshToken).digest("hex"),
            issuedAt: new Date(iat * 1000),
            expiredAt: new Date(exp * 1000),
            ip: req.socket.remoteAddress,
            idUser: userExist["id"],
        };
        await mysqlRefreshToken.insertRefreshToken(rtInfo);
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
            const createdIdUser = await mysqlUser.register(info);
            if (createdIdUser) {
                next();
            } else {
                throw new Error(
                    "Đăng ký không thành công, vui lòng thử lại sau",
                    "REGISTER_FAILED"
                );
            }
        } else {
            throw new UserError("Email không hợp lệ, vui lòng chọn email khác", "EMAIL_INVALID");
        }
    } catch (e) {
        res.sendError(e, FILE_NAME < register.name);
    }
}

async function getTokenByRefreshToken(req, res) {
    try {
        const { refreshToken } = req.body;
        try {
            const decoded = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret);
            const idUser = decoded.id;
            const ip = req.socket.remoteAddress;
            const hashedToken = sha("sha256").update(refreshToken).digest("hex");
            const tokenExist = await mysqlRefreshToken.getRefreshToken({
                refreshToken: hashedToken,
                ip,
                idUser,
            });
            if (!tokenExist) {
                throw new Error("Refresh token invalid.", "TOKEN_INVALID");
            }
            const userExist = await mysqlUser.getUserById(idUser);
            if (userExist) {
                delete userExist["password"];
                delete userExist["createdAt"];
                const token = jwt.sign(
                    JSON.parse(JSON.stringify(userExist)),
                    jwtConfig.tokenSecret,
                    {
                        expiresIn: jwtConfig.tokenLife,
                    }
                );
                res.status(200).json({
                    data: token,
                    message: null,
                });
            } else {
                throw new Error("Refresh token malformed.", "TOKEN_MALFORMED");
            }
        } catch (e) {
            console.error(e);
            res.status(401).json({
                data: {},
                message: "Refresh token invalid.",
            });
        }
    } catch (e) {
        res.sendError(e, FILE_NAME, getTokenByRefreshToken.name);
    }
}

async function logout(req, res) {
    try {
        const idUser = req.user.id;
        const { token, refreshToken } = req.body;
        const tokenPayload = jwt.decode(token);
        const refreshTokenPayload = jwt.decode(refreshToken);
        if (tokenPayload.id !== refreshTokenPayload.id || idUser !== refreshTokenPayload.id) {
            throw new UserError("Token invalid", "TOKEN_INVALID");
        }
        const ip = req.socket.remoteAddress;
        await mysqlRefreshToken.remove(refreshToken, ip, idUser);
        res.status(200).json({ data: {}, message: null });
    } catch (e) {
        res.sendError(e, FILE_NAME, logout.name);
    }
}

module.exports = {
    login,
    register,
    getTokenByRefreshToken,
    logout,
};

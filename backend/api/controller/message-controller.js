const mysqlMessage = require("../../database/mysql/facade/message");
const mysqlUser = require("../../database/mysql/facade/user");
const { UserError } = require("../../common/utils/custom-errors");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function getLatestMessages(req, res) {
    try {
        const { id } = req.user;
        const data = await mysqlMessage.getLatestMessages(id);
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getLatestMessages.name);
    }
}

async function getMessagesBySlug(req, res) {
    try {
        const { id: idCurrentUser } = req.user;
        const { slug } = req.params;
        const targetUser = await mysqlUser.getUserBySlug(slug);
        if (targetUser) {
            throw new UserError("Không tồn tại người dùng này", "USER_NOT_EXIST");
        }
        const messages = await mysqlMessage.getMessageByUserId(idCurrentUser, targetUser.id);
        res.status(200).json({
            data: messages,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getMessagesBySlug.name);
    }
}

module.exports = {
    getLatestMessages,
    getMessagesBySlug,
};

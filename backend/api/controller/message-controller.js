const mysqlMessage = require("../../database/mysql/facade/message");
const { UserError } = require("../../common/utils/custom-errors");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function getLatestMessages(req, res) {
    try {
        const idUser = 2;
        const data = await mysqlMessage.getLatestMessages(idUser);
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getLatestMessages.name);
    }
}

module.exports = {
    getLatestMessages,
};

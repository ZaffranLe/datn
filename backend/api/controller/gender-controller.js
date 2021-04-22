const mysqlGender = require("../../database/mysql/facade/gender");
const { UserError } = require("../../common/utils/custom-errors");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function getAll(req, res) {
    try {
        const data = await mysqlGender.getAll();
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getAll.name);
    }
}

module.exports = {
    getAll
};

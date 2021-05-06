const { UserError } = require("../../common/utils/custom-errors");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function uploadFiles(req, res) {
    try {
        res.status(201).json({
            data: [],
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, uploadFiles.name);
    }
}

module.exports = { uploadFiles };

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

async function getById(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlGender.getById(id);
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getById.name);
    }
}

async function create(req, res) {
    try {
        const data = await mysqlGender.create(req.body);
        res.status(201).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, create.name);
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlGender.update(id, req.body);
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, update.name);
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        await mysqlGender.remove(id);
        res.status(200).json({
            data: {},
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, remove.name);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};

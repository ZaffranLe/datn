const mysqlPost = require("../../database/mysql/facade/post");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function getByUserId(req, res) {
    const { id } = req.params;
    const data = await mysqlPost.getByUserId(id);
    try {
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getByUserId.name);
    }
}

async function create(req, res) {
    try {
        const { images, content } = req.body;
        await mysqlPost.create({ images, content, idUser: req.user.id });
        res.status(201).json({
            data: {},
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, create.name);
    }
}

module.exports = { create, getByUserId };

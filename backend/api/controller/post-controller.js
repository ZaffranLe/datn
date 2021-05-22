const mysqlPost = require("../../database/mysql/facade/post");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function getByUserId(req, res) {
    const { id } = req.params;
    const { id: idCurrentUser } = req.user;
    const data = await mysqlPost.getByUserId(id, idCurrentUser);
    try {
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getByUserId.name);
    }
}

async function getById(req, res) {
    const { id } = req.params;
    const { id: idCurrentUser } = req.user;
    try {
        const data = await mysqlPost.getById(id, idCurrentUser);
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

async function changeLikeStatus(req, res) {
    try {
        const { id: idUser } = req.user;
        const { id: idPost } = req.body;
        const newStatus = await mysqlPost.changeLikeStatus(idUser, idPost);
        res.status(201).json({
            data: newStatus,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, changeLikeStatus.name);
    }
}

module.exports = { create, getByUserId, changeLikeStatus, getById };

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

async function deleteById(req, res) {
    const { id } = req.params;
    try {
        await mysqlPost.deleteById(id);
        res.status(200).json({
            data: {},
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, deleteById.name);
    }
}

async function create(req, res) {
    try {
        const { images, content } = req.body;
        const newPost = await mysqlPost.create({ images, content, idUser: req.user.id });
        res.status(201).json({
            data: newPost,
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
        const data = await mysqlPost.changeLikeStatus(idUser, idPost);
        res.status(201).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, changeLikeStatus.name);
    }
}

async function submitCommentToPost(req, res) {
    try {
        const { id: idUser } = req.user;
        const { idPost, comment } = req.body;
        const newComment = await mysqlPost.submitCommentToPost(idPost, idUser, comment);
        res.status(201).json({
            data: newComment,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, submitCommentToPost.name);
    }
}

module.exports = { create, getByUserId, changeLikeStatus, getById, submitCommentToPost,deleteById };

const { UserError } = require("../../common/utils/custom-errors");
const mysqlFile = require("../../database/mysql/facade/file");
const fs = require("fs");
const FILE_NAME = module.filename.split("\\").slice(-1)[0];

async function uploadImages(req, res) {
    const images = req.files.map((file) => ({
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
    }));
    try {
        const data = await mysqlFile.uploadImages(images);
        res.status(201).json({
            data,
            message: null,
        });
    } catch (e) {
        const promises = [];
        for (let image of images) {
            promises.push(fs.promises.unlink(`public/images/${image.fileName}`));
        }
        await Promise.all(promises);
        res.sendError(e, FILE_NAME, uploadImages.name);
    }
}

async function getImage(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlFile.getImage(id);
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getImage.name);
    }
}

async function getImageByUserId(req, res) {
    try {
        const { id } = req.params;
        const data = await mysqlFile.getImageByUserId(id);
        res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        res.sendError(e, FILE_NAME, getImageByUserId.name);
    }
}

module.exports = { uploadImages, getImage, getImageByUserId };

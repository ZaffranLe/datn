const knex = require("../knex-client");

async function uploadImages(images = [], transaction = null) {
    const _knex = transaction || (await knex.transaction());
    try {
        const promises = [];
        for (let image of images) {
            promises.push(_knex("image").insert(image));
        }
        let idList = await Promise.all(promises);
        idList = idList.map((_rs) => _rs[0]);
        if (!transaction) {
            await _knex.commit();
        }
        const data = await knex("image").whereIn("id", idList);
        return data;
    } catch (e) {
        if (!transaction) {
            await _knex.rollback();
        }
        throw e;
    }
}

async function getImage(id) {
    const image = await knex("image").where("id", id).first();
    return image;
}

async function getImageByUserId(id) {
    const images = await knex("image").where("idUser", id);
    return images;
}

async function getImageList(idList) {
    const images = await knex("image").whereIn("id", idList);
    return images;
}

module.exports = {
    uploadImages,
    getImage,
    getImageByUserId,
    getImageList,
};

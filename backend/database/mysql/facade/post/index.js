const knex = require("../knex-client");
const _ = require("lodash");

async function getByUserId(id) {
    const columns = {
        id: "t1.id",
        content: "t1.content",
        idUser: "t1.idUser",
        createdAt: "t1.createdAt",
        updatedAt: "t1.updatedAt",
        imgFileName: "t3.fileName",
        imgId: "t3.id",
    };
    const data = await knex("post AS t1")
        .leftJoin("post_image AS t2", "t1.id", "t2.idPost")
        .leftJoin("image AS t3", "t2.idImage", "t3.id")
        .where("t1.idUser", id)
        .columns(columns);
    let result = {};
    data.forEach((post) => {
        if (result.hasOwnProperty(post.id)) {
            result[post.id].images.push({
                id: post.imgId,
                fileName: post.imgFileName,
            });
        } else {
            result[post.id] = {
                id: post.id,
                content: post.content,
                idUser: post.idUser,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                images: post.imgId
                    ? [
                          {
                              id: post.imgId,
                              fileName: post.imgFileName,
                          },
                      ]
                    : [],
            };
        }
    });
    return _.sortBy(Object.keys(result).map((key) => result[key]), ["createdAt"]).reverse();
}

async function create(info, transaction = null) {
    const _knex = transaction || (await knex.transaction());
    try {
        const { images } = info;
        const fields = ["idUser", "content"];
        const data = _.pick(info, fields);
        const createdPost = await _knex("post").insert(data);
        const createdPostId = createdPost[0];
        if (images.length > 0) {
            const imageList = images.map((img) => ({
                idImage: img.id,
                idPost: createdPostId,
            }));
            await _knex("post_image").insert(imageList);
            const imageIdList = images.map((img) => img.id);
            await _knex("image").update({ idUser: data.idUser }).whereIn("id", imageIdList);
        }
        if (!transaction) {
            await _knex.commit();
        }
    } catch (e) {
        if (!transaction) {
            await _knex.rollback();
        }
        throw e;
    }
}

module.exports = {
    create,
    getByUserId,
};

const knex = require("../knex-client");
const _ = require("lodash");

// id current user is for checking liking status
async function getByUserId(id, idCurrentUser) {
    const postColumns = {
        id: "t1.id",
        content: "t1.content",
        idUser: "t1.idUser",
        createdAt: "t1.createdAt",
        updatedAt: "t1.updatedAt",
    };
    const posts = await knex("post AS t1")
        .where("idUser", id)
        .orderBy("createdAt", "desc")
        .columns(postColumns);
    const imgPromises = [];
    const likeStatusPromises = [];
    const imgColumns = {
        id: "t2.id",
        fileName: "t2.fileName",
    };
    posts.forEach((post) => {
        imgPromises.push(
            knex("post_image AS t1")
                .join("image AS t2", "t1.idImage", "t2.id")
                .where("idPost", post.id)
                .columns(imgColumns)
        );
        likeStatusPromises.push(
            knex("user_like_post").where({ idUser: idCurrentUser, idPost: post.id }).first()
        );
    });

    const imgData = await Promise.all(imgPromises);
    const likeStatusData = await Promise.all(likeStatusPromises);
    for (let i = 0; i < posts.length; ++i) {
        posts[i].images = imgData[i];
        posts[i].isLiked = Boolean(likeStatusData[i]);
    }

    return posts;
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

async function changeLikeStatus(idUser, idPost, transaction = null) {
    const _knex = transaction || knex;
    const getLikeStatus = _knex("user_like_post").where({
        idUser: idUser,
        idPost: idPost,
    });
    let newStatus = true;
    const didLike = await getLikeStatus.first();
    if (didLike) {
        await getLikeStatus.del();
        newStatus = false;
    } else {
        await _knex("user_like_post").insert({ idUser, idPost });
    }
    return newStatus;
}

module.exports = {
    create,
    getByUserId,
    changeLikeStatus,
};

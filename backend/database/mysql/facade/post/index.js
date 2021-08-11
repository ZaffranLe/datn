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
    const numOfLikePromises = [];
    const commentPromises = [];
    const imgColumns = {
        id: "t2.id",
        fileName: "t2.fileName",
    };
    const commentColumns = {
        id: "t1.id",
        content: "t1.content",
        imgFileName: "t3.fileName",
        imgId: "t3.id",
        userAvatar: "t5.fileName",
        userFirstName: "t4.firstName",
        userLastName: "t4.lastName",
        userSlug: "t4.slug",
        createdAt: "t1.createdAt",
        idComment: "t1.idComment",
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
        numOfLikePromises.push(knex("user_like_post").where({ idPost: post.id }));
        commentPromises.push(
            knex("post_comment AS t1")
                .join("user AS t4", "t1.idUser", "t4.id")
                .leftJoin("image AS t5", "t4.avatar", "t5.id")
                .leftJoin("comment_image AS t2", "t1.id", "t2.idComment")
                .leftJoin("image AS t3", "t2.idImage", "t3.id")
                .where("t1.idPost", post.id)
                .columns(commentColumns)
        );
    });

    const imgData = await Promise.all(imgPromises);
    const likeStatusData = await Promise.all(likeStatusPromises);
    const numOfLikeData = await Promise.all(numOfLikePromises);
    const commentData = await Promise.all(commentPromises);
    for (let i = 0; i < posts.length; ++i) {
        posts[i].images = imgData[i];
        posts[i].isLiked = Boolean(likeStatusData[i]);
        posts[i].numOfLike = numOfLikeData[i].length;
        commentData[i].forEach((_comment) => {
            _comment.comments = commentData[i].filter(
                (__comment) => __comment.idComment === _comment.id
            );
        });
        posts[i].comments = commentData[i];
    }

    return posts;
}

async function getById(id, idCurrentUser) {
    const postColumns = {
        id: "t1.id",
        content: "t1.content",
        idUser: "t1.idUser",
        createdAt: "t1.createdAt",
        updatedAt: "t1.updatedAt",
    };
    const post = await knex("post AS t1").where("id", id).columns(postColumns).first();
    const imgColumns = {
        id: "t2.id",
        fileName: "t2.fileName",
    };
    const images = await knex("post_image AS t1")
        .join("image AS t2", "t1.idImage", "t2.id")
        .where("idPost", id)
        .columns(imgColumns);
    const isLiked = await knex("user_like_post")
        .where({ idUser: idCurrentUser, idPost: id })
        .first();
    const numOfLike = await knex("user_like_post").where("idPost", id);

    post.images = images;
    post.isLiked = Boolean(isLiked);
    post.numOfLike = numOfLike.length;
    return post;
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
            await _knex("image")
                .update({ idUser: data.idUser, isUsing: 1 })
                .whereIn("id", imageIdList);
        }
        if (!transaction) {
            await _knex.commit();
        }
        const newPost = {
            id: createdPostId,
            content: data.content,
            idUser: data.idUser,
            createdAt: new Date(),
            updatedAt: new Date(),
            isLiked: false,
            numOfLike: 0,
            images: images.map((img) => ({ id: img.id, fileName: img.fileName })),
            comments: [],
        };
        return newPost;
    } catch (e) {
        if (!transaction) {
            await _knex.rollback();
        }
        throw e;
    }
}

async function changeLikeStatus(idUser, idPost, transaction = null) {
    const _knex = transaction || knex;
    let numOfLike = await _knex("user_like_post").where("idPost", idPost);
    numOfLike = numOfLike.length;
    const getLikeStatus = _knex("user_like_post").where({
        idUser: idUser,
        idPost: idPost,
    });
    let newStatus = true;
    const didLike = await getLikeStatus.first();
    if (didLike) {
        await getLikeStatus.del();
        newStatus = false;
        numOfLike -= 1;
    } else {
        await _knex("user_like_post").insert({ idUser, idPost });
        numOfLike += 1;
    }
    return {
        isLiked: newStatus,
        numOfLike,
    };
}

async function submitCommentToPost(idPost, idUser, comment, transaction = null) {
    const _knex = transaction || (await knex.transaction());
    const { content, image = null, idComment = null } = comment;
    try {
        const data = {
            idPost,
            idUser,
            content,
            idComment,
        };
        const _comment = await _knex("post_comment").insert(data);
        const idCreatedComment = _comment[0];
        if (image) {
            await _knex("comment_image").insert({
                idComment: idCreatedComment,
                idImage: image.id,
            });
            await _knex("image").update({ idUser: idUser, isUsing: 1 }).where("id", image.id);
        }
        if (!transaction) {
            await _knex.commit();
        }
        const newComment = {
            id: idCreatedComment,
            idComment,
        };
        return newComment;
    } catch (e) {
        if (!transaction) {
            await _knex.rollback();
        }
    }
}

module.exports = {
    create,
    getByUserId,
    changeLikeStatus,
    getById,
    submitCommentToPost,
};

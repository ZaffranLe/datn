import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function getUserBySlug(slug) {
    try {
        const resp = await APICall({
            url: `/api/user/url/${slug}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function getUserBasicInfoBySlug(slug) {
    try {
        const resp = await APICall({
            url: `/api/user/info/${slug}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function checkFollowUser(id) {
    try {
        const resp = await APICall({
            url: `/api/user/follow/${id}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function changeFollowUser(id) {
    try {
        const resp = await APICall({
            url: "/api/user/follow",
            method: constants.HTTP_METHOD.POST,
            data: {
                id,
            },
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function getImagesByUserId(id) {
    try {
        const resp = await APICall({
            url: `/api/file/image/user/${id}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function getPostByUserId(id) {
    try {
        const resp = await APICall({
            url: `/api/post/user/${id}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}
async function getPostById(id) {
    try {
        const resp = await APICall({
            url: `/api/post/${id}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function createPost(images, content) {
    try {
        await APICall({
            url: "/api/post",
            method: constants.HTTP_METHOD.POST,
            data: {
                images,
                content,
            },
        });
    } catch (e) {
        throw e.response.data.message;
    }
}

async function changeLikeStatus(idPost) {
    try {
        const resp = await APICall({
            url: "/api/post/like",
            method: constants.HTTP_METHOD.POST,
            data: {
                id: idPost,
            },
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function submitCommentToPost(idPost, comment, image) {
    try {
        await APICall({
            url: "/api/post/comment",
            method: constants.HTTP_METHOD.POST,
            data: {
                idPost,
                comment: {
                    content: comment,
                    image,
                },
            },
        });
    } catch (e) {
        throw e.response.data.message;
    }
}

export {
    getPostByUserId,
    getUserBySlug,
    checkFollowUser,
    changeFollowUser,
    getImagesByUserId,
    createPost,
    changeLikeStatus,
    getPostById,
    submitCommentToPost,
    getUserBasicInfoBySlug,
};

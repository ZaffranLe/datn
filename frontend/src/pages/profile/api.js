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
      url: `/api/user/info/slug/${slug}`,
      method: constants.HTTP_METHOD.GET,
    });
    return resp.data.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

async function getUserBasicInfoById(id) {
  try {
    const resp = await APICall({
      url: `/api/user/info/${id}`,
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
    const resp = await APICall({
      url: "/api/post",
      method: constants.HTTP_METHOD.POST,
      data: {
        images,
        content,
      },
    });
    return resp.data.data;
  } catch (e) {
    throw e.response.data.message;
  }
}

async function deletePost(id) {
  try {
    const resp = await APICall({
      url: `/api/post/${id}`,
      method: constants.HTTP_METHOD.DELETE,
    });
    return resp.data.data;
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

async function submitCommentToPost(idPost, comment, image, idComment = null) {
  try {
    const resp = await APICall({
      url: "/api/post/comment",
      method: constants.HTTP_METHOD.POST,
      data: {
        idPost,
        comment: {
          content: comment,
          image,
          idComment,
        },
      },
    });
    return resp.data.data;
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
  getUserBasicInfoById,
  deletePost,
};

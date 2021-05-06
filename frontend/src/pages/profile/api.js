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

export { getUserBySlug, checkFollowUser, changeFollowUser };

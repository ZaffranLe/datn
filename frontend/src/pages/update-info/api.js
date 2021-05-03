import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function updateInfo(info) {
    try {
        const resp = await APICall({
            url: "/api/user/self",
            method: constants.HTTP_METHOD.PUT,
            data: info,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function checkSlug(slug) {
    try {
        const resp = await APICall({
            url: "/api/user/check-slug",
            method: constants.HTTP_METHOD.POST,
            data: {
                slug,
            },
        });
        return resp.data.data;
    } catch (e) {
        throw e.reponse.data.message;
    }
}

export { updateInfo, checkSlug };

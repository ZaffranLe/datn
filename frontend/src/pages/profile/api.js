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

export { getUserBySlug };

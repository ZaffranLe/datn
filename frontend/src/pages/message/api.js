import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function getAllByUserSlug(slug) {
    try {
        const resp = await APICall({
            url: `/api/message/url/${slug}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function getLatestMessages(page) {
    try {
        const resp = await APICall({
            url: "/api/message/get-latest",
            method: constants.HTTP_METHOD.POST,
            data: {
                page,
            },
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

async function sendMessage(data) {
    
}

export { getAllByUserSlug, getLatestMessages };

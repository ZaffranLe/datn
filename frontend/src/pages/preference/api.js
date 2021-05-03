import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function getAll() {
    try {
        const resp = await APICall({
            url: "/api/preference",
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

export { getAll };

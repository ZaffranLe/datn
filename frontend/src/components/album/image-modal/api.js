import APICall from "../../../utils/api/api-call";
import constants from "../../../common/constants";

async function getImage(id) {
    try {
        const resp = await APICall({
            url: `/api/file/image/${id}`,
            method: constants.HTTP_METHOD.GET,
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

export { getImage };

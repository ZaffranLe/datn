import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function changeSkipUser(id) {
    try {
        const resp = await APICall({
            url: "/api/user/skip",
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

export { changeSkipUser };

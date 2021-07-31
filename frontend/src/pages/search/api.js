import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function searchUser(searchText) {
    try {
        const resp = await APICall({
            url: "/api/user/search",
            method: constants.HTTP_METHOD.GET,
            params: {
                name: searchText,
            },
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

export { searchUser };

import APICall from "../../utils/api/api-call";
import constants from "../../common/constants";

async function loginApi(email, password) {
    try {
        const resp = await APICall({
            url: "/api/login",
            method: constants.HTTP_METHOD.POST,
            data: {
                email,
                password,
            },
        });
        return resp.data.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

export { loginApi };

import APICall from "../api/api-call";
import constants from "../../common/constants";
import { appendTokenInfo } from "../../common/common";

async function getTokenByRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        const resp = await APICall({
            url: "/api/refresh-token",
            method: constants.HTTP_METHOD.POST,
            data: {
                refreshToken,
            },
        });
        const token = resp.data.data;
        appendTokenInfo(token);
        return token;
    } else {
        throw new Error("Refresh token invalid");
    }
}

export { getTokenByRefreshToken };

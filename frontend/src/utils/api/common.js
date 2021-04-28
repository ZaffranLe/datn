import APICall from "../api/api-call";
import jwt from "jsonwebtoken";
import constants from "../../common/constants";

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
        localStorage.setItem(token);
        const userInfo = jwt.decode(token);
        window.userInfo = { ...userInfo };
    } else {
        throw new Error("Refresh token invalid");
    }
}

function appendTokenPayload() {
    const token = localStorage.getItem("token");
    const payload = jwt.decode(token);
}

export { getTokenByRefreshToken };

import APICall from "../api/api-call";
import constants from "../../common/constants";
import { appendTokenInfo } from "../../common/common";
import config from "../config/cfg";
import axios from "axios";

const env = config.environment;
const origin = config[env].originBackend;

async function uploadImages(images, callback = null) {
    const formData = new FormData();
    for (let image of images) {
        formData.append("images", image);
    }
    const resp = await APICall({
        url: "/api/file/upload/image",
        method: constants.HTTP_METHOD.POST,
        data: formData,
        onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
        },
    });
    return resp.data.data;
}

async function getTokenByRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        const resp = await axios({
            url: `${origin}/api/refresh-token`,
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

export { getTokenByRefreshToken, uploadImages };

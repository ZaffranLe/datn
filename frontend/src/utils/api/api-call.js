import axios from "axios";
import { toast } from "react-toastify";
import { history } from "../../pages/history";
import config from "../config/cfg";
import { getTokenByRefreshToken } from "./common";

const env = config.environment;
const origin = config[env].originBackend;
const instance = axios.create({});

instance.interceptors.request.use(
    async (config) => {
        if (config.url.startsWith("/")) {
            config.url = `${origin}${config.url}`;
        }

        if (config.url.startsWith(origin)) {
            const token = localStorage.getItem("token");
            config.headers["token"] = token;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const errorResponse = error.response;
        if (errorResponse && errorResponse.status === 401) {
            try {
                const token = await getTokenByRefreshToken();
                errorResponse.config.headers["token"] = token;
            } catch (e) {
                toast.error("Phiên đăng nhập đã hết hạn.");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("token");
                window.userInfo = undefined;
                history.push("/login");
                return Promise.reject(e);
            }

            return Promise.resolve(instance(errorResponse.config));
        }
        // If the error is due to other reasons, we just throw it back to axios
        return Promise.reject(error);
    }
);

export default instance;

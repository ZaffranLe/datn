import axios from "axios";
import config from "../config/cfg";

const env = config.environment;

const origin = config[env].originBackend;

const instance = axios.create({});

instance.interceptors.request.use(
    async (config) => {
        if (config.url.startsWith("/")) {
            // eslint-disable-next-line no-param-reassign
            config.url = `${origin}${config.url}`;
        }

        // if (config.url.startsWith(origin)) {
        //     if (!refreshToken) {
        //         loginByFPTOpenId();
        //     }
        //     config.headers['x-access-token'] = token;
        // }

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
                // const token = await getToken();
                // localStorage.setItem('token', token);
            } catch (e) {
                return Promise.reject(e);
            }

            return Promise.resolve(instance(errorResponse.config));
        }
        // If the error is due to other reasons, we just throw it back to axios
        return Promise.reject(error);
    }
);

export default instance;

import axios from "axios";
import { toast } from "react-toastify";
import { devConsoleError, devConsoleLog } from "utils/helperFunctions";
import { appConfig } from "./app.config";

axios.defaults.baseURL = appConfig.api.baseUrl;

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        devConsoleLog(`REQUEST : ${config.url}\n\nJSON : ${JSON.stringify(config)}`);

        return config;
    },
    function (error) {
        // Do something with request error
        devConsoleLog(`API request error : ${JSON.stringify(error)}`);

        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        devConsoleLog(
            `RESPONSE : ${response.config.url} - Status : ${response.status} \n\nJSON : ${JSON.stringify(response)}`
        );

        return response;
    },
    function (error) {
        // Do something with response error
        if (error.response) {
            devConsoleError(`API response error : ${JSON.stringify(error.response)}`);

            if (
                error.response.config &&
                error.response.config.disableErrorToast !== true &&
                error.response?.status !== 401 &&
                error.response?.status !== 403 &&
                error.response?.status !== 500
            ) {
                toast.error(error.response?.data?.Message ?? error.message);
            }
        } else {
            devConsoleError(`API response error : ${JSON.stringify(error)}`);
        }

        return Promise.reject({
            name: error.name,
            message: error.response?.data?.Message ?? error.message,
            code: error.response?.status?.toString() ?? error.code,
            stack: error.stack,
        });
    }
);

export default axios;

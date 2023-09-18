import axios from "api/axiosApiClient";
import { CustomAxiosRequestConfig } from "api/requestModels";
import { Mutex } from "async-mutex";
import { AxiosError } from "axios";
import { SupportedLanguageEnum } from "utils/enums";
import { getFrontendVersion } from "utils/helperFunctions";
import { getRefreshToken, getToken, setUserLocalStorageData } from "utils/storageActions";

const mutex = new Mutex();

export const executeAxiosRequestWithRefresh = async (config: CustomAxiosRequestConfig): Promise<any> => {
    {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();

        let result = await executeAxiosRequest(config);

        if (result.error) {
            if (result.error?.code === "401") {
                if (!mutex.isLocked()) {
                    const release = await mutex.acquire();

                    try {
                        const refreshResult = await executeAxiosRequest({
                            url: "/api/account/refresh-token",
                            method: "POST",
                            data: {
                                refreshToken: getRefreshToken(),
                            },
                            disableErrorToast: true,
                        });

                        if (refreshResult.data) {
                            setUserLocalStorageData(refreshResult.data);
                            // Retry initial query
                            result = await executeAxiosRequest(config);
                        } else {
                            return Promise.reject(result.error);
                        }
                    } finally {
                        // release must be called once the mutex should be released again.
                        release();
                    }
                } else {
                    // wait until the mutex is available without locking it
                    await mutex.waitForUnlock();
                    result = await executeAxiosRequest(config);
                }
            } else {
                return Promise.reject(result.error);
            }
        }

        return result;
    }
};

export const executeAxiosRequest = async (config: CustomAxiosRequestConfig) => {
    try {
        let requestConfig: CustomAxiosRequestConfig = {
            ...config,
            url: axios.defaults.baseURL! + config.url,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${getToken()}`,
                Culture: localStorage.getItem("lng") || SupportedLanguageEnum[SupportedLanguageEnum.English],
                "str-client-version": getFrontendVersion(),
            },
        };

        const result = await axios(requestConfig);
        return { data: result.data };
    } catch (error) {
        return { error: error as AxiosError };
    }
};

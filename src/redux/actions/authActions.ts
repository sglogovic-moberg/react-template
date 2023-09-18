import { createAsyncThunk } from "@reduxjs/toolkit";
import { executeAxiosRequest, executeAxiosRequestWithRefresh } from "redux/services";
import { reduxAction } from "utils/constants";
import { getRefreshToken, removeUserLocalStorageData, setUserLocalStorageData } from "utils/storageActions";
import {
    ILoginParams,
} from "redux/models/authModels";

export const authAdminThunk = createAsyncThunk("auth/authAdmin", async data => {
    return await executeAxiosRequestWithRefresh({
        url: "/api/account/auth",
        method: "GET",
        disableErrorToast: true,
    });
});

export const adminLoginThunk = createAsyncThunk("auth/adminLogin", async (params: ILoginParams, thunkAPI) => {
    try {
        const isImpsersonateAdminLogin = !!params.token;
        const response = await executeAxiosRequestWithRefresh({
            url: `/api/account/${isImpsersonateAdminLogin ? "login-impersonate-user" : "login"}`,
            method: "POST",
            data: params,
        });

        //Later on we will use language which was stored in DB for logged in user. Not yet implemented
        //handleChangeLanguage(response.data.language);
        setUserLocalStorageData(response.data);

        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const adminLogoutThunk = createAsyncThunk("auth/adminLogout", async (request, thunkApi) => {
    await executeAxiosRequest({
        url: "/api/account/logout",
        method: "POST",
        data: {
            refreshToken: getRefreshToken(),
        },
    });

    thunkApi.dispatch({ type: reduxAction.resetStore });
    removeUserLocalStorageData();
});
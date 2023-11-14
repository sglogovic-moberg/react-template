import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginParams } from "redux/models/authModels";
import { executeAxiosRequestWithRefresh } from "redux/services";
import { reduxAction } from "utils/constants";
import {
    getToken,
    getUserLocalStorageData,
    removeUserLocalStorageData,
    setUserLocalStorageData,
} from "utils/storageActions";

export const authAdminThunk = createAsyncThunk("auth/authAdmin", async (data, thunkAPI) => {
    // Usually some BE call here to check if user token is valid and authorized.
    // For now, just check if token is present.
    if (getToken()) {
        return getUserLocalStorageData();
    } else {
        throw new Error("Unauthorized");
    }
});

export const adminLoginThunk = createAsyncThunk("auth/adminLogin", async (params: ILoginParams, thunkAPI) => {
    try {
        const response = await executeAxiosRequestWithRefresh({
            url: "/login",
            method: "POST",
            data: {
                username: params.username,
                password: params.password,
            },
        });

        setUserLocalStorageData(response.data);

        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const adminLogoutThunk = createAsyncThunk("auth/adminLogout", async (request, thunkApi) => {
    // usually some sort of BE call here to logout user

    thunkApi.dispatch({ type: reduxAction.resetStore });
    removeUserLocalStorageData();
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginParams } from "redux/models/authModels";
import { executeAxiosRequest } from "redux/services";
import { reduxAction } from "utils/constants";
import { getRefreshToken, getToken, removeUserLocalStorageData, setUserLocalStorageData } from "utils/storageActions";

export const authAdminThunk = createAsyncThunk("auth/authAdmin", async data => {
    // Usually some BE call here to check if user token is valid and authorized.
    // For now, just check if token is present.
    if (getToken()) {
        return true;
    } else {
        throw new Error("Unauthorized");
    }
});

export const adminLoginThunk = createAsyncThunk("auth/adminLogin", async (params: ILoginParams, thunkAPI) => {
    try {
        // usualy some sort of BE call here to login user
        const response = {
            data: {
                refreshToken: "refreshToken",
                token: "token",
            },
        };

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

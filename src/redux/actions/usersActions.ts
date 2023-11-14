import { createAsyncThunk } from "@reduxjs/toolkit";
import { executeAxiosRequestWithRefresh } from "redux/services";
import { UserRoleEnum } from "utils/enums";

export const deleteUserThunk = createAsyncThunk("user/deleteUser", async (data: any, thunkAPI) => {
    try {
        const response = await executeAxiosRequestWithRefresh({
            url: "/users/delete",
            method: "POST",
            data: {
                id: data,
            },
        });

        return response;
    } catch (error) {}
});

export const createUserThunk = createAsyncThunk("user/createUser", async (data: any, thunkAPI) => {
    try {
        const response = await executeAxiosRequestWithRefresh({
            url: "/users/add",
            method: "POST",
            data: {
                Name: data.name,
                Email: data.username,
                Password: data.password,
                UserRole: UserRoleEnum.User,
            },
        });

        return response;
    } catch (error) {}
});

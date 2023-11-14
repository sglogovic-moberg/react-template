import { createAsyncThunk } from "@reduxjs/toolkit";
import { executeAxiosRequestWithRefresh } from "redux/services";

export const deletePostThunk = createAsyncThunk("post/deletePost", async (data: any, thunkAPI) => {
    const response = await executeAxiosRequestWithRefresh({
        url: "/posts/delete",
        method: "POST",
        data: {
            id: data,
        },
    });

    return response;
});

export const createPostThunk = createAsyncThunk("post/createPost", async (data: any, thunkAPI) => {
    const response = await executeAxiosRequestWithRefresh({
        url: "/posts/add",
        method: "POST",
        data: {
            title: data.title,
            description: data.description,
            userId: data.userId,
        },
    });

    return response;
});

export const editPostThunk = createAsyncThunk("post/editPostThunk", async (data: any, thunkAPI) => {
    const response = await executeAxiosRequestWithRefresh({
        url: "/posts/edit",
        method: "POST",
        data: {
            title: data.title,
            description: data.description,
            id: data.id,
        },
    });

    return response;
});

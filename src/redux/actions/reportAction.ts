import { createAsyncThunk } from "@reduxjs/toolkit";
import { executeAxiosRequestWithRefresh } from "redux/services";
import { IPageSettings } from "utils/models";
import { setPageSettings, setPageSize } from "utils/storageActions";

export const setColumnVisibilityThunk = createAsyncThunk<any, IPageSettings>("report/setColumnVisibility", request => {
    setPageSettings(request.pageType, request.columns);
    return request;
});

export const setQueryPageSizeThunk = createAsyncThunk<any, number>("report/setQueryPageSize", (request, thunkApi) => {
    setPageSize(request);
    return request;
});

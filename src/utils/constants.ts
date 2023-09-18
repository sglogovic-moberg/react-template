import { baseApi } from "api/baseApi";
import { modalSliceName } from "redux/reducers/modalReducer";

export const reduxAction = {
    resetStore: "store/reset",
};

export const ignoreLoader = [baseApi.reducerPath, modalSliceName];

export const mobileScreenResolution = "(max-width: 768px)";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "api/baseApi";
import { useDispatch } from "react-redux";
import { AnyAction, combineReducers } from "redux";
import authReducer from "redux/reducers/authReducer";
import modalReducer from "redux/reducers/modalReducer";
import { loaderMiddleware, authMiddleware } from "redux/storeActionMiddleware";
import { reduxAction } from "utils/constants";
import reportReducer from "./reducers/reportReducer";

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
    if (action.type === reduxAction.resetStore) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const appReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    report: reportReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: () =>
        getDefaultMiddleware().prepend(loaderMiddleware).concat(authMiddleware).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

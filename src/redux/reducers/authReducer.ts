import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminLoginThunk, adminLogoutThunk, authAdminThunk } from "redux/actions/authActions";
import { LoadingActionModel } from "redux/models/authModels";
import { LoginStateEnum, UserRoleEnum } from "utils/enums";

export interface IAuthState {
    loginState: LoginStateEnum;
    loadingActions: Array<LoadingActionModel>;
    userId: number;
    userRole: UserRoleEnum;
}

const initialState: IAuthState = {
    loginState: LoginStateEnum.Unauthorized,
    loadingActions: [],
    userId: 0,
    userRole: UserRoleEnum.None,
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        unAuthorizedAdmin(state: IAuthState) {
            state.loginState = LoginStateEnum.Unauthorized;
        },
        unInitializedAdmin(state: IAuthState) {
            state.loginState = LoginStateEnum.Uninitialized;
        },
        addLoaderAction(state: IAuthState, action: PayloadAction<LoadingActionModel>) {
            state.loadingActions.push(action.payload);
        },
        removeLoaderAction(state: IAuthState, action: PayloadAction<string>) {
            state.loadingActions = state.loadingActions.filter(x => x.requestId != action.payload);
        },
        setUserCredentials(state: IAuthState, action: PayloadAction<any>) {
            state.loginState = LoginStateEnum.LoggedIn;
            state.userId = action.payload.userId;
            state.userRole = action.payload.userRole;
        },
    },
    extraReducers: builder => {
        builder.addCase(adminLoginThunk.pending, state => {});
        builder.addCase(adminLoginThunk.fulfilled, (state, action: PayloadAction<any>) => {
            state.loginState = LoginStateEnum.LoggedIn;
            state.userId = action.payload.data.userId;
            state.userRole = action.payload.data.userRole;
        });
        builder.addCase(adminLoginThunk.rejected, state => {
            state.loginState = LoginStateEnum.Unauthorized;
        });
        builder.addCase(adminLogoutThunk.pending, state => {});
        builder.addCase(adminLogoutThunk.fulfilled, state => {
            state.loginState = LoginStateEnum.Unauthorized;
        });
        builder.addCase(adminLogoutThunk.rejected, state => {
            state.loginState = LoginStateEnum.Unauthorized;
        });

        builder.addCase(authAdminThunk.pending, state => {});
        builder.addCase(authAdminThunk.fulfilled, (state, action: any) => {
            state.loginState = LoginStateEnum.LoggedIn;
            state.userId = action.payload.data.userId;
            state.userRole = action.payload.data.userId;
        });
        builder.addCase(authAdminThunk.rejected, state => {
            state.loginState = LoginStateEnum.Uninitialized;
        });
    },
});

const { reducer } = authReducer;
export const { unAuthorizedAdmin, unInitializedAdmin, addLoaderAction, removeLoaderAction } = authReducer.actions;
export default reducer;

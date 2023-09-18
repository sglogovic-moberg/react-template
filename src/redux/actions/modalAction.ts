import { createAsyncThunk } from "@reduxjs/toolkit";
import { FeedbackMessage, OpenModalPayload } from "redux/models/modalModels";
import { openModal } from "redux/reducers/modalReducer";
import { executeAxiosRequestWithRefresh } from "redux/services";
import store from "redux/store";

const modalThunkActions = {
    open: createAsyncThunk("modal", async ({ modalType, props }: OpenModalPayload, thunkApi) => {
        thunkApi.dispatch(openModal({ modalType, props }));

        return new Promise<any>(resolve => {
            const unsubscribe = store.subscribe(() => {
                const state = store.getState();
                const modal = state.modal.modalDescriptors.find(x => x.modalType === modalType);
                if (modal?.isConfirmed) {
                    unsubscribe();
                    resolve(modal?.data ?? true);
                }
                if (modal?.isDeclined) {
                    unsubscribe();
                    resolve(null);
                }
            });
        });
    }),
};

export default modalThunkActions


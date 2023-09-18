import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ConfirmModalPayload,
    DeclineModalPayload,
    ModalBaseProps,
    OpenModalPayload,
    SetModalPayload,
} from "redux/models/modalModels";

export interface ModalState {
    modalDescriptors: ModalBaseProps[];
}

const initialState: ModalState = {
    modalDescriptors: [],
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal(state: ModalState, action: PayloadAction<OpenModalPayload>): void {
            if (state.modalDescriptors.some(x => x.modalType === action.payload.modalType)) {
                const modalIndex = state.modalDescriptors.findIndex(x => x.modalType === action.payload.modalType);
                state.modalDescriptors[modalIndex].modalType = action.payload.modalType;
                state.modalDescriptors[modalIndex].props = action.payload.props;
                state.modalDescriptors[modalIndex].isOpened = true;
                state.modalDescriptors[modalIndex].isConfirmed = false;
                state.modalDescriptors[modalIndex].isDeclined = false;
            } else {
                state.modalDescriptors.push({
                    modalType: action.payload.modalType,
                    props: action.payload.props,
                    isOpened: true,
                    isDeclined: false,
                    isConfirmed: false,
                });
            }
        },
        confirmModal(state: ModalState, action: PayloadAction<ConfirmModalPayload>) {
            const modalIndex = state.modalDescriptors.findIndex(x => x.modalType === action.payload.modalType);
            state.modalDescriptors[modalIndex].isOpened = false;
            state.modalDescriptors[modalIndex].isConfirmed = true;
            state.modalDescriptors[modalIndex].isDeclined = false;
        },
        declineModal(state: ModalState, action: PayloadAction<DeclineModalPayload>) {
            const modalIndex = state.modalDescriptors.findIndex(x => x.modalType === action.payload.modalType);
            state.modalDescriptors[modalIndex].isOpened = false;
            state.modalDescriptors[modalIndex].isConfirmed = false;
            state.modalDescriptors[modalIndex].isDeclined = true;
        },
        setModalData(state: ModalState, action: PayloadAction<SetModalPayload>) {
            const modalIndex = state.modalDescriptors.findIndex(x => x.modalType === action.payload.modalType);
            state.modalDescriptors[modalIndex].data = action.payload.data;
        },
    },
});

// https://stackoverflow.com/questions/51197819/declaring-const-of-generic-type/51197906
// export const showModal: <T extends ModalBaseProps = ModalBaseProps>(modalType: ModalTypeEnum, args?: T) => any = (
//     modalType: ModalTypeEnum,
//     args: any
// ) => modalSlice.actions.showModal({ modalType: modalType, actionContext: args });

export const { confirmModal, declineModal, openModal, setModalData } = modalSlice.actions;
const { reducer, name } = modalSlice;
export default reducer;
export const modalSliceName = name;

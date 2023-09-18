import { BaseModalProps } from "components/baseModal/baseModal";
import { ModalTypeEnum } from "utils/enums";

export interface ModalBaseProps {
    modalType: ModalTypeEnum;
    isOpened: boolean;
    isConfirmed: boolean;
    isDeclined: boolean;
    props?: BaseModalProps;
    data?: any;
}

export interface OpenModalPayload {
    modalType: ModalTypeEnum;
    props?: BaseModalProps;
}

export interface ConfirmModalPayload {
    modalType: ModalTypeEnum;
}

export interface DeclineModalPayload {
    modalType: ModalTypeEnum;
}

export interface SetModalPayload {
    modalType: ModalTypeEnum;
    data: any;
}

export interface FeedbackMessage {
    feedbackMessage: string;
}

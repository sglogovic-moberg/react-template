import { t } from "i18next";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import { StringResources } from "utils/language/languageResource";
import "./baseModal.scss";
import { useAppDispatch } from "redux/store";
import { confirmModal, declineModal } from "redux/reducers/modalReducer";
import { ModalActionButtonTypeEnum, ModalTypeEnum } from "utils/enums";
import BaseButton from "components/baseButton/baseButton";
import { TrashIcon } from "components/icons";

export interface BaseModalProps {
    title: string;
    closeButtonText?: string;
    actionButtonText?: string;
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "lg";
    lineSeparators?: boolean;
    modalType: ModalTypeEnum;
    modalActionButtonType?: ModalActionButtonTypeEnum;
}

function BaseModal(props: BaseModalProps) {
    const {
        title,
        children,
        modalActionButtonType = ModalActionButtonTypeEnum.Confirm,
        closeButtonText = t(StringResources.modal.close),
        actionButtonText = t(StringResources.modal.confirm),
        className,
        modalType,
        size = "sm",
        lineSeparators = true,
    } = props;

    const dispatch = useAppDispatch();

    const onCancelClick = () => {
        dispatch(declineModal({ modalType: modalType }));
    };

    const onOkClick = () => {
        dispatch(confirmModal({ modalType: modalType }));
    };

    function renderActionButton(modalActionButtonType: ModalActionButtonTypeEnum) {
        if (modalActionButtonType == ModalActionButtonTypeEnum.Delete) {
            return <BaseButton
                handleClick={onOkClick}
                text={actionButtonText}
                size={"medium"}
                styleType={"solid"}
                danger={true}
                leftIcon={<TrashIcon className="filter-footer--filter-icon" color="white" />} />
        }
        else {
            return <BaseButton handleClick={onOkClick} text={actionButtonText} styleType="solid" />
        }
    }

    return (
        <Modal
            show={true}
            size={size}
            onHide={onCancelClick}
            dialogClassName="base-modal"
            contentClassName={`${className ? className : ""}`}
        >
            <Modal.Header closeButton className={classNames({ "modal-border-bottom": lineSeparators })}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer className={classNames({ "modal-border-top": lineSeparators })}>
                <BaseButton handleClick={onCancelClick} text={closeButtonText} styleType="line" />

                {renderActionButton(modalActionButtonType)}
            </Modal.Footer>
        </Modal>
    );
}

export default BaseModal;

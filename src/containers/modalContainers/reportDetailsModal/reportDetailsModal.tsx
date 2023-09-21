import ReportDetails from "containers/reportDetails/reportDetails";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { declineModal } from "redux/reducers/modalReducer";
import { RootState, useAppDispatch } from "redux/store";
import { ModalTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

import "./reportDetailsModal.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ReportDetailsModal = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const activeRowDataIndex = useSelector((state: RootState) => state.report.activeRowIndex);

    useEffect(() => {
        if (activeRowDataIndex < 0) {
            dispatch(declineModal({ modalType: ModalTypeEnum.Details }));
        }
    }, [activeRowDataIndex]);

    const onCancelClick = () => {
        dispatch(declineModal({ modalType: ModalTypeEnum.Details }));
    };

    return (
        <Modal show={true} onHide={onCancelClick} dialogClassName="base-modal-details">
            <Modal.Header closeButton>
                <Modal.Title>{`${t(StringResources.modal.details)}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="base-modal-details__modal-body">
                <ReportDetails />
            </Modal.Body>
        </Modal>
    );
};

export default ReportDetailsModal;

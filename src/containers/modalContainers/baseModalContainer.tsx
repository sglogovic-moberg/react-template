import { useSelector } from "react-redux";
import { ModalBaseProps } from "redux/models/modalModels";
import { RootState } from "redux/store";
import { ModalTypeEnum } from "utils/enums";
import "./baseModalContainer.scss";
import BaseModal from "components/baseModal/baseModal";

const modalMapping: { [modalType in ModalTypeEnum]: Function } = {
    [ModalTypeEnum.Confirm]: BaseModal,
    [ModalTypeEnum.None]: () => {
        <></>;
    },
};
function BaseModalContainer() {
    const { modalDescriptors } = useSelector((state: RootState) => state.modal);

    if (modalDescriptors.length === 0) {
        return <></>;
    }

    return (
        <>
            {modalDescriptors
                .filter(x => x.isOpened)
                .map((value: ModalBaseProps) => {
                    const Modal = modalMapping[value.modalType];
                    // @ts-ignore
                    return <Modal key={value.modalType} {...value.props} />;
                })}
        </>
    );
}

export default BaseModalContainer;

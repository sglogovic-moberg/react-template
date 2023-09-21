import ColumnContentFotter from "containers/specialMenu/columnContent/columnContentFooter/columnContentFooter";
import ColumnContentBody from "containers/specialMenu/columnContent/columnContentBody/columnContentBody";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Modal } from "react-bootstrap";
import { setColumnVisibilityThunk } from "redux/actions/reportAction";
import { useSelector } from "react-redux";
import { IColumnVisibility } from "redux/models/reportModels";
import { confirmModal, declineModal } from "redux/reducers/modalReducer";
import { RootState, useAppDispatch } from "redux/store";
import { ModalTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

const SpecialMenuColumnModal = () => {
    const dispatch = useAppDispatch();
    const pageType = useSelector((state: RootState) => state.report.pageType);
    const columnVisibility = useSelector((state: RootState) => state.report.columnVisibility);
    const defaultColumnVisibility = useSelector((state: RootState) => state.report.defaultColumnVisibility);
    const [localColumnVisibility, setLocalColumnVisibility] = useState<IColumnVisibility[]>(columnVisibility);
    const [isWarningVisible, setIsWarningVisible] = useState(false);

    const isSaveButtonDisabled = !localColumnVisibility.some(x => x.visible);

    const onCancelClick = () => {
        dispatch(declineModal({ modalType: ModalTypeEnum.SpecialMenuColumn }));
    };

    const onColumnSwitchToggle = (id: string, checked: boolean) => {
        setLocalColumnVisibility(prevState => {
            return prevState?.map(column => {
                if (column.id === id) {
                    return { ...column, visible: checked };
                }

                return column;
            });
        });
    };

    useEffect(() => {
        let usavedChangesExists = localColumnVisibility.some(
            (x, index) => x.id != columnVisibility[index]?.id || x.visible != columnVisibility[index]?.visible
        );

        setIsWarningVisible(usavedChangesExists);
    }, [columnVisibility, localColumnVisibility]);

    const onSelectAllClick = () => {
        const isSelectAllActive = localColumnVisibility.every(x => x.visible);

        setLocalColumnVisibility(x => {
            return x?.map(column => {
                return { ...column, visible: !isSelectAllActive };
            });
        });
    };

    const onSaveClick = () => {
        setIsWarningVisible(false);
        dispatch(setColumnVisibilityThunk({ pageType, columns: localColumnVisibility }));

        dispatch(confirmModal({ modalType: ModalTypeEnum.SpecialMenuColumn }));
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const tmpLocalColumnVisability = Array.from(localColumnVisibility);
        const [newOrder] = tmpLocalColumnVisability.splice(source.index, 1);
        tmpLocalColumnVisability.splice(destination.index, 0, newOrder);
        setLocalColumnVisibility(tmpLocalColumnVisability);
    };

    const onResetClick = () => {
        dispatch(setColumnVisibilityThunk({ pageType, columns: defaultColumnVisibility }));
    };

    return (
        <Modal show={true} onHide={onCancelClick}>
            <Modal.Header closeButton>
                <Modal.Title>{`${t(StringResources.modal.column)}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ColumnContentBody
                        resetToDefaultClick={onResetClick}
                        onSelectAllClick={onSelectAllClick}
                        onColumnSwitchToggle={onColumnSwitchToggle}
                        localColumnVisibility={localColumnVisibility}
                        unsavedChangesExists={isWarningVisible}
                    />
                </DragDropContext>
            </Modal.Body>
            <Modal.Footer>
                <ColumnContentFotter
                    onSaveClick={onSaveClick}
                    isSaveButtonDisabled={isSaveButtonDisabled}
                    onCancelClick={onCancelClick}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default SpecialMenuColumnModal;

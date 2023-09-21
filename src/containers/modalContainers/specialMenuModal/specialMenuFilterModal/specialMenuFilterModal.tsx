import FilterPanelBody from "containers/specialMenu/filter/filterContent/filterPanelContent";
import FilterFooter from "containers/specialMenu/filter/filterFooter/filterFooter";
import { t } from "i18next";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { confirmModal, declineModal } from "redux/reducers/modalReducer";
import { setQueryFilters } from "redux/reducers/reportReducer";
import { useAppDispatch, RootState } from "redux/store";
import { ModalTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

const SpecialMenuFilterModal = () => {
    const dispatch = useAppDispatch();
    const filterDefinitions = useSelector((state: RootState) => state.report.filterDefinitions);
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);
    const [currentFilters, setCurrentFilters] = useState<any>(queryFilters);

    const onCancelClick = () => {
        dispatch(declineModal({ modalType: ModalTypeEnum.SpecialMenuFilter }));
    };

    const onFilterClick = () => {
        dispatch(setQueryFilters(currentFilters));
        dispatch(confirmModal({ modalType: ModalTypeEnum.SpecialMenuFilter }));
    };

    const onClearClick = () => {
        setCurrentFilters({});
        dispatch(setQueryFilters({}));
    };

    const onFilterChange = (newValue: any, field: string) => {
        setCurrentFilters((prevState: any) => ({
            ...prevState,
            [field]: newValue,
        }));
    };

    return (
        <Modal show={true} onHide={onCancelClick}>
            <Modal.Header closeButton>
                <Modal.Title>{`${t(StringResources.modal.filter)}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FilterPanelBody
                    onFilterChange={onFilterChange}
                    currentFilters={currentFilters}
                    filterDefinitions={filterDefinitions}
                />
            </Modal.Body>
            <Modal.Footer>
                <FilterFooter onClearClick={onClearClick} onFilterClick={onFilterClick} />
            </Modal.Footer>
        </Modal>
    );
};

export default SpecialMenuFilterModal;

import SpecialMenu from "components/specialMenus/specialMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IColumnVisibility } from "redux/models/reportModels";
import { RootState, useAppDispatch } from "redux/store";
import ColumnContentBody from "./columnContentBody/columnContentBody";
import ColumnContentFotter from "./columnContentFooter/columnContentFooter";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { t } from "i18next";
import { StringResources } from "utils/language/languageResource";
import { mobileScreenResolution } from "utils/constants";
import { useMediaQuery, useModalManagement } from "utils/customHooks";
import { ModalTypeEnum } from "utils/enums";
import { setColumnVisibilityThunk } from "redux/actions/reportAction";

const ColumnContentSpecialMenu = () => {
    const dispatch = useAppDispatch();
    const columnVisibility = useSelector((state: RootState) => state.report.columnVisibility);
    const defaultColumnVisibility = useSelector((state: RootState) => state.report.defaultColumnVisibility);
    const pageType = useSelector((state: RootState) => state.report.pageType);
    const [localColumnVisibility, setLocalColumnVisibility] = useState<IColumnVisibility[]>(columnVisibility);
    const [isSpecialMenuOpen, setIsSpecialMenuOpen] = useState(false);
    const [isWarningVisible, setIsWarningVisible] = useState(false);
    const isMobile = useMediaQuery(mobileScreenResolution);
    const modalManagement = useModalManagement();

    const isSaveButtonDisabled = !localColumnVisibility.some(x => x.visible);

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
        setLocalColumnVisibility(columnVisibility);
    }, [columnVisibility]);

    useEffect(() => {
        let usavedChangesExists = localColumnVisibility.some(
            (x, index) => x.id != columnVisibility[index].id || x.visible != columnVisibility[index].visible
        );

        if (!isSpecialMenuOpen) {
            setIsWarningVisible(usavedChangesExists);
        }
    }, [isSpecialMenuOpen, columnVisibility, localColumnVisibility]);

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
        // will be used later for saving column visibility and order in the backend
        //dispatch(changeVisibleColumnsThunk({reportName:"transactions", columnVisibility:localColumnVisibility}));

        setIsSpecialMenuOpen(false);
    };

    const onCancelClick = () => {
        setIsWarningVisible(false);
        setLocalColumnVisibility(columnVisibility);
        setIsSpecialMenuOpen(false);
    };

    const onResetClick = () => {
        setLocalColumnVisibility(defaultColumnVisibility);
    };

    const setSpecialMenuVisibilty = (isVisible: boolean) => {
        isMobile
            ? modalManagement.openModal({ modalType: ModalTypeEnum.SpecialMenuColumn })
            : setIsSpecialMenuOpen(isVisible);
    };

    const columnContentText = <>{`${t(StringResources.columnChooser.column)}`}</>;

    // reorder columns
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const tmpLocalColumnVisability = Array.from(localColumnVisibility);
        const [newOrder] = tmpLocalColumnVisability.splice(source.index, 1);
        tmpLocalColumnVisability.splice(destination.index, 0, newOrder);
        setLocalColumnVisibility(tmpLocalColumnVisability);
    };

    return (
        <SpecialMenu
            text={columnContentText}
            isMenuOpen={isSpecialMenuOpen}
            setSpecialMenuVisibilty={setSpecialMenuVisibilty}
            bodyNode={
                <DragDropContext onDragEnd={onDragEnd}>
                    <ColumnContentBody
                        resetToDefaultClick={onResetClick}
                        onSelectAllClick={onSelectAllClick}
                        onColumnSwitchToggle={onColumnSwitchToggle}
                        localColumnVisibility={localColumnVisibility}
                        unsavedChangesExists={isSpecialMenuOpen && isWarningVisible}
                    />
                </DragDropContext>
            }
            footerNode={
                <ColumnContentFotter
                    onSaveClick={onSaveClick}
                    isSaveButtonDisabled={isSaveButtonDisabled}
                    onCancelClick={onCancelClick}
                />
            }
        />
    );
};

export default ColumnContentSpecialMenu;

import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ColumnDef } from "@tanstack/react-table";
import { IReportRowDefinitions } from "api/reportModels";
import { CustomAxiosRequestConfig } from "api/requestModels";
import BaseButton from "components/baseButton/baseButton";
import BaseTable from "components/baseTable/baseTable";
import GlobalDetails from "containers/reportDetails/globalDetails";
import ColumnContentSpecialMenu from "containers/specialMenu/columnContent/columnContentSpecialMenu";
import FilterSpecialMenu from "containers/specialMenu/filter/filterSpecialMenu";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setColumnVisibilityThunk, setQueryPageSizeThunk } from "redux/actions/reportAction";
import { IColumnVisibility } from "redux/models/reportModels";
import { setActiveRow, setQueryPageNumber, setQuerySortCriterion } from "redux/reducers/reportReducer";
import { executeAxiosRequestWithRefresh } from "redux/services";
import { RootState, useAppDispatch } from "redux/store";
import { mobileScreenResolution } from "utils/constants";
import { useMediaQuery, useModalManagement } from "utils/customHooks";
import { ModalTypeEnum } from "utils/enums";
import { getFileMetada, saveFile } from "utils/helperFunctions";
import { StringResources } from "utils/language/languageResource";
import variables from "../../style/colors.module.scss";
import "./reportContainer.scss";
import PlusIcon from "components/icons/plusIcon";

interface IReportContainerProps {
    data?: Array<any>;
    totalCount?: number;
    columnDefinitions: ColumnDef<any, any>[];
    rowDefinitions?: IReportRowDefinitions<any>;
    useExportQuery?: UseQuery<any>;
    exportRoute?: string;
    actions?: Array<any>;
}

const ReportContainer = ({
    data,
    totalCount,
    columnDefinitions,
    exportRoute,
    rowDefinitions,
    actions = [],
}: IReportContainerProps) => {
    const dispatch = useAppDispatch();
    const modalManagement = useModalManagement();
    const columnVisibility = useSelector((state: RootState) => state.report.columnVisibility);
    const storeQueryParams = useSelector((state: RootState) => state.report.queryParams);
    const pageType = useSelector((state: RootState) => state.report.pageType);
    const isMobile = useMediaQuery(mobileScreenResolution);
    const wrapperRef = useRef(null);
    const detailsRef = useRef(null);

    const { t } = useTranslation();

    const setActiveRowHandler = (rowId: number) => {
        const activeRowData = data ? data[rowId] : undefined;
        dispatch(setActiveRow({ data: activeRowData, index: rowId }));
    };

    const onPageChange = (newPage: number) => {
        dispatch(setQueryPageNumber(newPage));
    };

    const onPageSizeChange = (pageSize: number) => {
        dispatch(setQueryPageSizeThunk(pageSize));
    };

    const onSortChange = (sortCriterion?: string) => {
        dispatch(setQuerySortCriterion(sortCriterion));
    };

    const onColumnOrderChange = (newColumnOrder: IColumnVisibility[]) => {
        dispatch(setColumnVisibilityThunk({ pageType, columns: newColumnOrder }));
    };

    const onOpenExportModalClick = async () => {
        const modalData = await modalManagement.openModal({ modalType: ModalTypeEnum.Export });
        if (exportRoute && modalData) {
            const config: CustomAxiosRequestConfig = {
                url: exportRoute,
                method: "POST",
                responseType: "blob",
                disableErrorToast: true,
                params: {
                    sortCriteria: storeQueryParams.sortCriteria,
                },
                data: {
                    ...storeQueryParams.filters,
                    exportType: Number(modalData.exportType),
                    exportColumns: modalData.exportColumns,
                },
            };

            try {
                const response = await executeAxiosRequestWithRefresh(config);
                // todo: filename is written in content-disposition header, but we are returning only data from axios so i don't have access to that header here
                const metadata = getFileMetada(modalData.exportType);
                saveFile(response.data, metadata.filename, metadata.contentType);
                toast.success(t(StringResources.export.exportSuccess).toString());
            } catch (error) {
                toast.error(t(StringResources.export.exportError).toString());
            }
        }
    };

    return (
        <div className="report-container">
            <div className="report-container__header">
                <div className="report-container__header-title">{`${t(StringResources.pages[pageType].title)}`}</div>
                <div className="report-container__actions">
                    {actions.map(x => {
                        return (
                            <BaseButton
                                key={x.text}
                                text={x.text}
                                size="small"
                                handleClick={x.handleClick}
                                styleType="line"
                                className="bg-transparent"
                                leftIcon={
                                    <PlusIcon
                                        className="filter-footer--filter-icon"
                                        color={variables.colorPrimaryAlpha}
                                    />
                                }
                            />
                        );
                    })}
                    <ColumnContentSpecialMenu />
                    <FilterSpecialMenu />
                </div>
            </div>
            <div className="report-container__body">
                <div className="report-container__table">
                    <BaseTable
                        isExportShown={Boolean(exportRoute)}
                        onExportBtnClick={onOpenExportModalClick}
                        tableData={data}
                        totalCount={totalCount}
                        setActiveRow={setActiveRowHandler}
                        columnDefinition={columnDefinitions}
                        rowDefinitions={rowDefinitions}
                        columnVisibility={columnVisibility}
                        onPageChange={onPageChange}
                        onSortChange={onSortChange}
                        onColumnOrderChange={onColumnOrderChange}
                        onPageSizeChange={onPageSizeChange}
                        ref={wrapperRef}
                    />
                </div>
            </div>
            {!isMobile && (
                <div className="report-container__details" ref={detailsRef}>
                    <GlobalDetails />
                </div>
            )}
        </div>
    );
};

export default ReportContainer;

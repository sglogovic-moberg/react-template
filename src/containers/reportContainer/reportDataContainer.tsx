import { ColumnDef } from "@tanstack/react-table";
import { ReduxEnpointType } from "api/baseApi";
import { IReportFilter, IReportRowDefinitions, IReportDetailsDefinition } from "api/reportModels";
import ReportContainer from "containers/reportContainer/reportContainer";
import {
    calculateColumnVisibility,
    columnVisibilityFromColumnDefinition,
    getDefaultTableSort,
} from "containers/reportContainer/reportDataContainerHelpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setColumnVisibilityThunk } from "redux/actions/reportAction";
import {
    applySortCache,
    clearDetailsReportData,
    clearReportData,
    setDefaultColumnVisibility,
    setDefaultSort,
    setDetailsDefinitions,
    setFilterDefinitions,
    setInitialFiltersToQueryParams,
    setInitialTableActiveRow,
    setInitialTablePaginationParams,
    setPageType,
} from "redux/reducers/reportReducer";
import { checkIfHasCachedApiQueryByName } from "redux/selectors/apiSelectors";
import { RootState, useAppDispatch } from "redux/store";
import { PageTypeEnum } from "utils/enums";

interface IReportDataContainerProps {
    pageType: PageTypeEnum;
    filterDefinitions: IReportFilter[];
    columnDefinitions: ColumnDef<any, any>[];
    rowDefinitions?: IReportRowDefinitions<any>;
    detailsDefinitions?: IReportDetailsDefinition<any>;
    exportRoute?: string;
    actions?: Array<any>;
    endpoint: ReduxEnpointType;
}

// Container to clean data from store, init data and transfer drill filters to preapre for data fetching.
const ReportDataContainer = (props: IReportDataContainerProps) => {
    const dispatch = useAppDispatch();
    const [isReady, setIsReady] = useState(false);
    const hasCachedData = useSelector(state => checkIfHasCachedApiQueryByName(state, props.endpoint.name));

    useEffect(() => {
        const setComponentReady = async () => {
            await dispatch(clearReportData());
            await dispatch(clearDetailsReportData());

            const columnVisibility = calculateColumnVisibility(props.columnDefinitions, props.pageType);
            const defaultSort = getDefaultTableSort(props.columnDefinitions);

            await dispatch(setPageType(props.pageType));
            await dispatch(setDefaultColumnVisibility(columnVisibilityFromColumnDefinition(props.columnDefinitions)));
            await dispatch(setColumnVisibilityThunk({ pageType: props.pageType, columns: columnVisibility }));
            await dispatch(setFilterDefinitions(props.filterDefinitions));
            await dispatch(setDetailsDefinitions(props.detailsDefinitions));
            if (hasCachedData) {
                await dispatch(setInitialTablePaginationParams());
                await dispatch(setInitialTableActiveRow());
            }

            await dispatch(setInitialFiltersToQueryParams());
            defaultSort && (await dispatch(setDefaultSort(defaultSort)));
            await dispatch(applySortCache());
            setIsReady(true);
        };

        setComponentReady();

        return () => {
            dispatch(clearReportData());
            dispatch(clearDetailsReportData());
        };
    }, []);

    if (!isReady) {
        return <></>; // skeleton loader for table?
    }

    return <ReportDataFetchContainer {...props} />;
};

// Container to fetch data from api and transfer it to report.
const ReportDataFetchContainer = ({
    endpoint,
    columnDefinitions,
    rowDefinitions,
    exportRoute,
    actions,
}: IReportDataContainerProps) => {
    const storeQueryParams = useSelector((state: RootState) => state.report.queryParams);
    const { data } = endpoint.useQuery<any>(storeQueryParams);

    return (
        <ReportContainer
            columnDefinitions={columnDefinitions}
            rowDefinitions={rowDefinitions}
            data={data}
            totalCount={data?.length}
            exportRoute={exportRoute}
            actions={actions}
        />
    );
};

export default ReportDataContainer;

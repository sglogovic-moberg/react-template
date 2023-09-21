import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReportFilter, IDrillFilterValues, IReportDetailsDefinition } from "api/reportModels";
import { IQueryParams } from "api/requestModels";
import { setColumnVisibilityThunk, setQueryPageSizeThunk } from "redux/actions/reportAction";
import { IColumnVisibility, IReportReducerState } from "redux/models/reportModels";
import { PageTypeEnum } from "utils/enums";
import { IPageSettings } from "utils/models";
import { getPageSize } from "utils/storageActions";

const initialState: IReportReducerState = {
    queryParams: { pageSize: getPageSize(), pageNumber: 0, filters: {} }, // param
    drillFilters: [], // filteri, param
    sortCache: [],
    filterCache: [],
    pageNumberCache: [],
    pageSizeCache: [],

    detailsDefinitions: undefined,
    activeRow: undefined,
    activeRowIndex: -1,
    activeRowCache: [],

    defaultColumnVisibility: [],
    columnVisibility: [],
    filterDefinitions: [],
    pageType: PageTypeEnum.None,
};

const reportReducer = createSlice({
    name: "report",
    initialState,
    reducers: {
        setFilterDefinitions(state: IReportReducerState, action: PayloadAction<IReportFilter[]>) {
            state.filterDefinitions = action.payload;
        },
        setQueryParams(state: IReportReducerState, action: PayloadAction<IQueryParams>) {
            state.queryParams = action.payload;
        },
        clearReportData(state: IReportReducerState) {
            state.columnVisibility = [];
            state.filterDefinitions = [];
            state.queryParams = { ...state.queryParams, pageNumber: 0, filters: {}, sortCriteria: undefined };
        },
        setQueryFilters(state: IReportReducerState, action: PayloadAction<Record<string, any>>) {
            state.queryParams = {
                ...state.queryParams,
                // Every filter change needs to reset pageNumber as we don't know result set of the new query.
                // We could be on 6. page, but the new filters can reduce page numbers to e.g. 3. pages, and we would left on 6. page.
                // That's why we are reseting to first page.
                pageNumber: 0,
                filters: action.payload,
            };

            const filterCacheIndex = state.filterCache.findIndex(x => x.pageType === state.pageType);

            if (filterCacheIndex > -1) {
                state.filterCache[filterCacheIndex].filters = action.payload;
            } else {
                state.filterCache.push({
                    pageType: state.pageType,
                    filters: action.payload,
                });
            }

            state.pageNumberCache = state.pageNumberCache.filter(x => x.pageType !== state.pageType);
        },
        setQueryPageNumber(state: IReportReducerState, action: PayloadAction<number>) {
            state.queryParams = {
                ...state.queryParams,
                pageNumber: action.payload,
            };

            const pageNumberCacheIndex = state.pageNumberCache.findIndex(x => x.pageType === state.pageType);

            if (pageNumberCacheIndex > -1) {
                state.pageNumberCache[pageNumberCacheIndex].pageNumber = action.payload;
            } else {
                state.pageNumberCache.push({
                    pageType: state.pageType,
                    pageNumber: action.payload,
                });
            }
        },
        setQuerySortCriterion(state: IReportReducerState, action: PayloadAction<string | undefined>) {
            state.queryParams = {
                ...state.queryParams,
                sortCriteria: action.payload,
            };

            const sortCacheIndex = state.sortCache.findIndex(x => x.pageType === state.pageType);
            if (!action.payload) {
                if (sortCacheIndex !== -1) {
                    state.sortCache.splice(sortCacheIndex, 1);
                }
            } else if (sortCacheIndex > -1) {
                state.sortCache[sortCacheIndex].sortCriteria = action.payload;
            } else {
                state.sortCache.push({
                    pageType: state.pageType,
                    sortCriteria: action.payload,
                });
            }
        },
        setDefaultSort(state: IReportReducerState, action: PayloadAction<string>) {
            const sortCacheIndex = state.sortCache.findIndex(x => x.pageType === state.pageType);

            // Add default sort to the cache if there is no sort in the cache for the current page.
            if (sortCacheIndex < 0) {
                state.sortCache.push({
                    pageType: state.pageType,
                    sortCriteria: action.payload,
                });
            }
        },
        setDrillFilters(state: IReportReducerState, action: PayloadAction<IDrillFilterValues[]>) {
            state.drillFilters = action.payload;
        },
        setPageType(state: IReportReducerState, action: PayloadAction<PageTypeEnum>) {
            state.pageType = action.payload;
        },
        applySortCache(state: IReportReducerState) {
            const sortCacheIndex = state.sortCache.findIndex(x => x.pageType === state.pageType);
            if (sortCacheIndex > -1) {
                state.queryParams = {
                    ...state.queryParams,
                    sortCriteria: state.sortCache[sortCacheIndex].sortCriteria,
                };
            }
        },
        setInitialFiltersToQueryParams(state: IReportReducerState) {
            // use drill filters if there are any
            if (state.drillFilters.length > 0) {
                const drillFilters: Record<string, any> = state.drillFilters.reduce(
                    (acc: any, curr) => ((acc[curr.field] = curr.value), acc),
                    {}
                );

                state.queryParams.filters = drillFilters;
                state.drillFilters = [];

                const filterCacheIndex = state.filterCache.findIndex(x => x.pageType === state.pageType);
                if (filterCacheIndex > -1) {
                    state.filterCache[filterCacheIndex].filters = drillFilters;
                } else {
                    state.filterCache.push({
                        pageType: state.pageType,
                        filters: drillFilters,
                    });
                }
            } else {
                // If there were no drill filters, use filter cache.
                const filterCacheIndex = state.filterCache.findIndex(x => x.pageType === state.pageType);
                if (filterCacheIndex > -1) {
                    state.queryParams.filters = state.filterCache[filterCacheIndex].filters;
                }
            }
        },
        setInitialTablePaginationParams(state: IReportReducerState) {
            if (state.drillFilters.length === 0) {
                // If there were no drill filters, use pagination cache.
                const pageNumberCacheIndex = state.pageNumberCache.findIndex(x => x.pageType === state.pageType);
                const pageSizeCacheIndex = state.pageSizeCache.findIndex(x => x.pageType === state.pageType);
                if (pageNumberCacheIndex > -1) {
                    state.queryParams.pageNumber = state.pageNumberCache[pageNumberCacheIndex].pageNumber;
                }

                if (pageSizeCacheIndex > -1) {
                    state.queryParams.pageSize = state.pageSizeCache[pageSizeCacheIndex].pageSize;
                } else {
                    state.queryParams.pageSize = getPageSize();
                }
            }
        },
        setDefaultColumnVisibility(state: IReportReducerState, action: PayloadAction<IColumnVisibility[]>) {
            state.defaultColumnVisibility = action.payload;
        },

        setActiveRow(state: IReportReducerState, action: PayloadAction<any>) {
            state.activeRow = action.payload.data;
            state.activeRowIndex = action.payload.index;

            const activeRowCacheIndex = state.activeRowCache.findIndex(x => x.pageType === state.pageType);

            if (activeRowCacheIndex > -1) {
                state.activeRowCache[activeRowCacheIndex].activeRow = action.payload.data;
                state.activeRowCache[activeRowCacheIndex].activeRowIndex = action.payload.index;
            } else {
                state.activeRowCache.push({
                    pageType: state.pageType,
                    activeRow: action.payload.data,
                    activeRowIndex: action.payload.index,
                });
            }
        },
        clearActiveRow(state: IReportReducerState) {
            state.activeRow = undefined;
            state.activeRowIndex = -1;

            // remove active row from cache if drawer is closed
            state.activeRowCache = state.activeRowCache.filter(x => x.pageType !== state.pageType);
        },
        clearDetailsReportData(state: IReportReducerState) {
            state.detailsDefinitions = undefined;
            state.activeRow = undefined;
            state.activeRowIndex = -1;
        },
        setInitialTableActiveRow(state: IReportReducerState) {
            if (state.drillFilters.length === 0) {
                // If there were no drill filters, use pagination cache.
                const activeRowCacheIndex = state.activeRowCache.findIndex(x => x.pageType === state.pageType);
                if (activeRowCacheIndex > -1) {
                    state.activeRow = state.activeRowCache[activeRowCacheIndex].activeRow;
                    state.activeRowIndex = state.activeRowCache[activeRowCacheIndex].activeRowIndex;
                }
            }
        },

        setDetailsDefinitions(
            state: IReportReducerState,
            action: PayloadAction<IReportDetailsDefinition<any> | undefined>
        ) {
            state.detailsDefinitions = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(setColumnVisibilityThunk.pending, state => {});
        builder.addCase(setColumnVisibilityThunk.fulfilled, (state, action: PayloadAction<IPageSettings>) => {
            state.columnVisibility = action.payload.columns;
        });
        builder.addCase(setColumnVisibilityThunk.rejected, state => {});

        builder.addCase(setQueryPageSizeThunk.fulfilled, (state, action) => {
            state.queryParams = {
                ...state.queryParams,
                pageSize: action.payload,
                pageNumber: 0,
            };

            const pageSizeCacheIndex = state.pageSizeCache.findIndex(x => x.pageType === state.pageType);

            if (pageSizeCacheIndex > -1) {
                state.pageSizeCache[pageSizeCacheIndex].pageSize = action.payload;
            } else {
                state.pageSizeCache.push({
                    pageType: state.pageType,
                    pageSize: action.payload,
                });
            }
        });
    },
});

export const {
    setFilterDefinitions,
    setQueryParams,
    setQueryFilters,
    clearReportData,
    setDrillFilters,
    setInitialFiltersToQueryParams,
    setInitialTablePaginationParams,
    setQueryPageNumber,
    setQuerySortCriterion,
    setPageType,
    applySortCache,
    setDefaultSort,
    setDefaultColumnVisibility,
    setActiveRow,
    setDetailsDefinitions,
    clearActiveRow,
    clearDetailsReportData,
    setInitialTableActiveRow,
} = reportReducer.actions;
const { reducer } = reportReducer;
export default reducer;

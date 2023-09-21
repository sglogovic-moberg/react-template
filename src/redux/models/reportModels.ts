import { IReportFilter, IDrillFilterValues, IReportDetailsDefinition } from "api/reportModels";
import { IQueryParams } from "api/requestModels";
import { Property } from "csstype";
import { PageTypeEnum } from "utils/enums";

export interface IColumnVisibility {
    id: string;
    label: string;
    visible: boolean;
    align?: Property.TextAlign;
}

export interface IReportReducerState {
    // Definitions
    defaultColumnVisibility: IColumnVisibility[]; // All columns and their visibilities unsroted, unfiltered.
    columnVisibility: IColumnVisibility[]; // All columns and their visibilities.
    filterDefinitions: IReportFilter[]; // Filter definitions for the report, defines which filters are available and how they change request
    pageType: PageTypeEnum;

    // For queries
    queryParams: IQueryParams; // Query parameters for the request

    // Other
    drillFilters: IDrillFilterValues[]; // Drill Filters that are applied to the filters after a drill down
    sortCache: Array<ISortCacheDefinition>; // Cache for sort criterions that are applied after returning to the page
    filterCache: Array<IFilterCacheDefinition>; // Cache for filter criterions that are applied after returning to the page
    pageNumberCache: Array<IPageNumberCacheDefinition>; // Cache for page numbers that are applied after returning to the page
    pageSizeCache: Array<IPageSizeCacheDefinition>; // Cache for page sizes that are applied after returning to the page

    detailsDefinitions?: IReportDetailsDefinition<any>;
    activeRow: any; // Active row for details.
    activeRowIndex: number; // Active row index for details.
    activeRowCache: Array<IActiveRowCacheDefinition>; // Cache for active row and active row index aftzer returning to the page
}

export interface IActiveRowCacheDefinition {
    pageType: PageTypeEnum;
    activeRowIndex: number;
    activeRow: any;
}

export interface ISortCacheDefinition {
    pageType: PageTypeEnum;
    sortCriteria: string;
}

export interface IFilterCacheDefinition {
    pageType: PageTypeEnum;
    filters: Record<string, any>;
}

export interface IPageNumberCacheDefinition {
    pageType: PageTypeEnum;
    pageNumber: number;
}

export interface IPageSizeCacheDefinition {
    pageType: PageTypeEnum;
    pageSize: number;
}

import { DetailHeaderEnum, DetailSectionEnum, DetailsRowTypeFormatterEnum, FilterTypeEnum } from "utils/enums";
import { Datetime } from "utils/formatter";

export interface IReportFilter {
    field: string;
    title: string;
    filterType: FilterTypeEnum;
    groupId?: number;
    toolTipDefinitions?: string[];
    dropdownFilterName?: string;
}

export interface IDrillFilterValues {
    field: string;
    value: any;
}

export interface IReportDetailsDefinition<T> {
    header?: DetailHeaderEnum;
    sections?: Array<DetailSectionEnum>;
    details: Array<IReportDetailsModel<T>>;
}

export interface IReportRowDefinitions<T> {
    condition: (data: T) => boolean;
    highlightBackgroundColor: string;
    highlightBorderColor: string;
}

export interface IReportDetailsModel<T> {
    key: string;
    rowType: DetailsRowTypeFormatterEnum;
    groupId?: number; // items with same groupId will be grouped together
    drill?: {
        // RowType drill informations.
        field: string; // Which field is set as filter value
        page: string; // Which page drill click is redirecting
    };
    label: string;
    // sometimes we want to format datetime but we are using DetailsRowTypeFormatterEnum.Id so we need to tell exactly what format to use.
    // Also, currency format is specifed in different field, so we will pass key as format (that's why is string) to know how to format
    format?: Datetime | string;
}

import { IColumnVisibility } from "redux/models/reportModels";
import { PageTypeEnum } from "utils/enums";

export interface ILookupResponse<T> {
    value: T;
    name: string;
}

export class IPageSettings {
    pageType!: PageTypeEnum;
    columns!: IColumnVisibility[];
}

export interface ExportMetadata {
    filename: string;
    contentType: string;
}

export interface ReportColumnData {
    name: string;
    prop: string;
}

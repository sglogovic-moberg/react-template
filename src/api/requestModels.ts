import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface CustomAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {
    config: CustomAxiosRequestConfig<D>;
}

interface CustomAxiosError<T = any, D = any> extends AxiosError<T, D> {
    config: CustomAxiosRequestConfig<D>;
    response: CustomAxiosResponse<T, D>;
}

export interface CustomAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    successMessage?: string;
    errorMessage?: string;
    disableErrorToast?: boolean;
}

export enum SortDirectionEnum {
    Ascending = 1,
    Descending = 2,
}

export interface SortCriterion {
    sortColumn: string;
    sortDirection: SortDirectionEnum;
}

export class CriteriaString {
    private _criteria: SortCriterion[];

    private constructor(criteria: SortCriterion[]) {
        this._criteria = criteria;
    }

    public static from(criteria: SortCriterion[]): CriteriaString {
        return new CriteriaString(criteria);
    }

    public static fromMultiple(...criteria: SortCriterion[]): CriteriaString {
        return new CriteriaString(criteria);
    }

    public toString = (): string => {
        const transformedCriteria = this._criteria.map(
            c => `${c.sortDirection == SortDirectionEnum.Descending ? "-" : ""}${c.sortColumn}`
        );
        return transformedCriteria.join(",");
    };

    public static fromString = (transformedCriteria: string): SortCriterion[] => {
        return transformedCriteria
            .split(",")
            .map(c => {
                const sortDirection = c.startsWith("-") ? SortDirectionEnum.Descending : SortDirectionEnum.Ascending;
                const sortColumn = c.startsWith("-") ? c.substring(1) : c;
                return { sortColumn, sortDirection };
            })
            .filter(c => c.sortColumn);
    };
}

export interface IBaseTableResponseModel {
    totalCount: number;
}

export interface IQueryParams {
    pageSize: number;
    pageNumber?: number;
    filters: Record<string, any>;
    /**
     * A comma-separated list of criterions. These strings should be constructed using the CriterionString type.
     */
    sortCriteria?: string;
    timestamp?: any;
}

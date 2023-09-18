import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn, QueryDefinition, createApi } from "@reduxjs/toolkit/query/react";
import { executeAxiosRequestWithRefresh } from "redux/services";
import { IBaseTableResponseModel, IQueryParams, CustomAxiosRequestConfig } from "./requestModels";
import { ApiEndpointQuery } from "@reduxjs/toolkit/dist/query/core/module";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";

const axiosBaseQuery = (): BaseQueryFn<CustomAxiosRequestConfig, unknown, unknown> => async config => {
    return await executeAxiosRequestWithRefresh(config);
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),
    endpoints: builder => ({}),
});

export const {} = baseApi;

export const standardQueryTableRequest = <T extends IBaseTableResponseModel>(url: string) => {
    return (data: IQueryParams) => ({
        url,
        method: "GET",
        params: {
            ...data.filters,
            pageSize: data.pageSize,
            page: data.pageNumber,
            sortCriteria: data.sortCriteria,
        },
    });
};

export const standardBuilderQueryRequest = <
    TResponseModel extends IBaseTableResponseModel,
    TQueryParams extends IQueryParams
>(
    url: string,
    builder: EndpointBuilder<BaseQueryFn<CustomAxiosRequestConfig<any>, unknown, unknown, {}, {}>, never, "api">
) => {
    return builder.query<TResponseModel, TQueryParams>({
        query: standardQueryTableRequest<TResponseModel>(url),
    });
};

type ReduxQueryDefinition = QueryDefinition<
    IQueryParams,
    BaseQueryFn<CustomAxiosRequestConfig<any>, unknown, unknown>,
    never,
    any,
    "api"
>;

type ReduxApiEndpointQueryDefinition = ApiEndpointQuery<ReduxQueryDefinition, any>;

type ReduxApiEndpointQueryHooksDefinition = QueryHooks<ReduxQueryDefinition>;

export type ReduxEnpointType = ReduxApiEndpointQueryHooksDefinition & ReduxApiEndpointQueryDefinition;

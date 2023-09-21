import { baseApi, standardQueryTableRequest } from "api/baseApi";
import { IQueryParams } from "api/requestModels";
import { IPostsModel } from "pages/posts/api/postsModels";

const basePostsRoute = "/posts";
export const postsExportRoute = `${basePostsRoute}/report`;

const postsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query<IPostsModel[], IQueryParams>({
            query: standardQueryTableRequest<IPostsModel[]>(basePostsRoute),
        }),
    }),
    overrideExisting: false,
});

export const { useGetPostsQuery, endpoints } = postsApi;

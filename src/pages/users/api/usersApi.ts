import { baseApi, standardQueryTableRequest } from "api/baseApi";
import { IQueryParams } from "api/requestModels";
import { IUsersModel } from "pages/users/api/usersModels";

const basePostsRoute = "/users";
export const postsExportRoute = `${basePostsRoute}/report`;

const userApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<IUsersModel, IQueryParams>({
            query: standardQueryTableRequest<IUsersModel>(basePostsRoute),
        }),
    }),
    overrideExisting: false,
});

export const { useGetUsersQuery, endpoints } = userApi;

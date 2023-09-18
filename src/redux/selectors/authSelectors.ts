import { createSelector } from "@reduxjs/toolkit";
import { baseApi } from "api/baseApi";
import { RootState } from "redux/store";

export const isActionLoadingSelector = createSelector(
    [(state: RootState) => state.auth.loadingActions, (state, actions: Array<string>) => actions],
    (items, actions) => {
        return items.some(y => actions.some(x => y.type.includes(x)));
    }
);

export const displayLoaderSelector = createSelector([(state: RootState) => state.auth.loadingActions], items => {
    return items.filter(x => !x.isLoaderIgnored);
});

export const isTableLoadingSelector = createSelector([(state: RootState) => state.auth.loadingActions], items => {
    return items.some(x => x.type.startsWith(baseApi.reducerPath));
});

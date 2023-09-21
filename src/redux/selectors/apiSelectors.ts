import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const getLatestApiQueryByName = createSelector(
    [(state: RootState) => state.api.queries, (state, action: string) => action],
    (items, action) => {
        return Object.values(items)
            .filter(x => x && x.endpointName === action)
            .find(
                item =>
                    item &&
                    item.fulfilledTimeStamp ===
                        Math.max(
                            ...Object.values(items)
                                .filter(x => x && x.endpointName === action)
                                .map(prop => prop?.fulfilledTimeStamp ?? 0)
                        )
            );
    }
);

export const checkIfHasCachedApiQueryByName = createSelector(
    [(state: RootState) => state.api.queries, (state, action: string) => action],
    (items, action) => {
        return Object.values(items)
            .filter(x => x && x.endpointName === action)
            .some(
                item =>
                    item &&
                    item.fulfilledTimeStamp ===
                        Math.max(
                            ...Object.values(items)
                                .filter(x => x && x.endpointName === action)
                                .map(prop => prop?.fulfilledTimeStamp ?? 0)
                        )
            );
    }
);

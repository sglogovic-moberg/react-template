import { createSelector } from "@reduxjs/toolkit";
import { SortingState } from "@tanstack/react-table";
import { CriteriaString, SortDirectionEnum } from "api/requestModels";
import { RootState } from "redux/store";

export const currentPageSortCriteriaSelector = createSelector(
    (state: RootState) => state.report.sortCache,
    (state: RootState) => state.report.pageType,
    (sortCache, pageType) => {
        const sortDefinition = sortCache.find(x => x.pageType === pageType);
        const sortingState: SortingState = [];
        if (sortDefinition) {
            const sortCriterions = CriteriaString.fromString(sortDefinition.sortCriteria);

            sortingState.push({
                desc: sortCriterions[0].sortDirection == SortDirectionEnum.Descending,
                id: sortCriterions[0].sortColumn,
            });
        }

        return sortingState;
    }
);

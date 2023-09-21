import { ColumnDef } from "@tanstack/react-table";
import { CriteriaString, SortDirectionEnum } from "api/requestModels";
import { PageTypeEnum } from "utils/enums";
import { getPageSettings } from "utils/storageActions";

export const columnVisibilityFromColumnDefinition = (columnDefinitions: ColumnDef<any, any>[]) => {
    let columnVisibility = columnDefinitions
        .filter(x => x != null)
        .map((column: any) => {
            return {
                id: column.id!,
                label: column.header(),
                visible: column.meta?.visible ?? false,
                align: column.meta?.align,
            };
        });

    return columnVisibility;
};

export const calculateColumnVisibility = (columnDefinitions: ColumnDef<any, any>[], pageType: PageTypeEnum) => {
    let columnVisibility = columnVisibilityFromColumnDefinition(columnDefinitions);

    const pageSettings = getPageSettings(pageType);
    if (pageSettings) {
        const pageSettingsColumns = pageSettings.columns.filter(x => x != null && x.id != null);
        let isPageSettingsValid = true;

        columnVisibility.forEach((column: any) => {
            const pageSettingsColumn = pageSettingsColumns.find((x: any) => x.id === column.id);

            if (!pageSettingsColumn) {
                isPageSettingsValid = false;
                return;
            }

            column.visible = pageSettingsColumn.visible;
        });

        if (!isPageSettingsValid) {
            return columnVisibility;
        }

        columnVisibility = columnVisibility.sort((a: any, b: any) => {
            const aIndex = pageSettingsColumns.findIndex((x: any) => x.id === a.id);
            const bIndex = pageSettingsColumns.findIndex((x: any) => x.id === b.id);

            // If a.id is not found in pageSettings, move it to the end of the array
            if (aIndex === -1) {
                return 1;
            }

            // If b.id is not found in pageSettings, move it to the end of the array
            if (bIndex === -1) {
                return -1;
            }

            return aIndex - bIndex;
        });
    }

    return columnVisibility;
};

export const getDefaultTableSort = (columnDefinitions: ColumnDef<any, any>[]) => {
    const defaultSort = columnDefinitions.find((x: any) => x.meta?.sortDefault != undefined);
    if (defaultSort) {
        return CriteriaString.from([
            {
                sortColumn: defaultSort.id!,
                sortDirection:
                    (defaultSort.meta as any).sortDefault === "desc"
                        ? SortDirectionEnum.Descending
                        : SortDirectionEnum.Ascending,
            },
        ]).toString();
    }

    return undefined;
};

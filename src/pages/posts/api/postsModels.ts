import { createColumnHelper } from "@tanstack/react-table";
import TableCellDefault from "components/tableCellComponents/tableCellDefault/tableCellDefault";
import { nameof } from "ts-simple-nameof";
import { StringResources } from "utils/language/languageResource";
import { t } from "i18next";
import { IReportDetailsDefinition, IReportFilter } from "api/reportModels";
import { DetailsRowTypeFormatterEnum, FilterTypeEnum } from "utils/enums";
import { IBaseTableResponseModel } from "api/requestModels";
import TableCellDate from "components/tableCellComponents/tableCellDate/tableCellDate";
import { PATHS } from "utils/routing/paths";

export interface IPostsModel extends IBaseTableResponseModel {
    data: Array<IGetPostsResponseListData>;
}

interface IGetPostsResponseListData {
    id: number;
    title: string;
    description: string;
    userId: number;
    userName: string;
    createdTime: string;
}

const columnHelper = createColumnHelper<IGetPostsResponseListData>();
export const postsColumnDefinition: any = [
    columnHelper.accessor(x => x.id, {
        id: nameof<IGetPostsResponseListData>(x => x.id),
        header: () => t(StringResources.pages.posts.id),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: false },
    }),
    columnHelper.accessor(x => x.title, {
        id: nameof<IGetPostsResponseListData>(x => x.title),
        header: () => t(StringResources.pages.posts.titleColumn),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.description, {
        id: nameof<IGetPostsResponseListData>(x => x.description),
        header: () => t(StringResources.pages.posts.body),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.userName, {
        id: nameof<IGetPostsResponseListData>(x => x.userName),
        header: () => t(StringResources.pages.posts.userName),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.createdTime, {
        id: nameof<IGetPostsResponseListData>(x => x.createdTime),
        header: () => t(StringResources.pages.posts.createdTime),
        cell: info => TableCellDate({ value: info.getValue() }),
        meta: { visible: true, sortDefault: "desc" },
    }),
];

export const postsDetailsDefinition: IReportDetailsDefinition<IGetPostsResponseListData> = {
    details: [
        {
            key: nameof<IGetPostsResponseListData>(x => x.id),
            rowType: DetailsRowTypeFormatterEnum.Id,
            label: StringResources.pages.posts.id,
        },
        {
            key: nameof<IGetPostsResponseListData>(x => x.title),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.posts.titleColumn,
        },
        {
            key: nameof<IGetPostsResponseListData>(x => x.description),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.posts.body,
        },
        {
            key: nameof<IGetPostsResponseListData>(x => x.userName),
            rowType: DetailsRowTypeFormatterEnum.Drill,
            drill: {
                field: "name",
                page: PATHS.Portal.Users,
            },
            label: StringResources.pages.posts.userName,
        },
    ],
};

export const postsFilterDefinitions: IReportFilter[] = [
    {
        field: "search",
        title: StringResources.pages.posts.search,
        filterType: FilterTypeEnum.TextFilter,
    },
];

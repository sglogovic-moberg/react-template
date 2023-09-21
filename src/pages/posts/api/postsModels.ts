import { createColumnHelper } from "@tanstack/react-table";
import TableCellDefault from "components/tableCellComponents/tableCellDefault/tableCellDefault";
import { nameof } from "ts-simple-nameof";
import { StringResources } from "utils/language/languageResource";
import { t } from "i18next";
import { IReportDetailsDefinition, IReportFilter } from "api/reportModels";
import { DetailsRowTypeFormatterEnum, FilterTypeEnum } from "utils/enums";

export interface IPostsModel {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const columnHelper = createColumnHelper<IPostsModel>();
export const postsColumnDefinition: any = [
    columnHelper.accessor(x => x.id, {
        id: nameof<IPostsModel>(x => x.id),
        header: () => t(StringResources.pages.posts.id),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: false },
    }),
    columnHelper.accessor(x => x.title, {
        id: nameof<IPostsModel>(x => x.title),
        header: () => t(StringResources.pages.posts.titleColumn),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.body, {
        id: nameof<IPostsModel>(x => x.body),
        header: () => t(StringResources.pages.posts.body),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.userId, {
        id: nameof<IPostsModel>(x => x.userId),
        header: () => t(StringResources.pages.posts.userId),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true, sortDefault: "desc" },
    }),
];

export const postsDetailsDefinition: IReportDetailsDefinition<IPostsModel> = {
    details: [
        {
            key: nameof<IPostsModel>(x => x.id),
            rowType: DetailsRowTypeFormatterEnum.Id,
            label: StringResources.pages.posts.id,
        },
        {
            key: nameof<IPostsModel>(x => x.title),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.posts.titleColumn,
        },
        {
            key: nameof<IPostsModel>(x => x.body),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.posts.body,
        },
        {
            key: nameof<IPostsModel>(x => x.userId),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.posts.userId,
        },
    ],
};

export const postsFilterDefinitions: IReportFilter[] = [
    {
        field: nameof<IPostsModel>(x => x.id),
        title: StringResources.pages.posts.id,
        filterType: FilterTypeEnum.NumberFilter,
    },
    {
        field: nameof<IPostsModel>(x => x.userId),
        title: StringResources.pages.posts.userId,
        filterType: FilterTypeEnum.NumberFilter,
    },
];

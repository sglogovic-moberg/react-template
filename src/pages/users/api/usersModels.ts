import { createColumnHelper } from "@tanstack/react-table";
import { IReportDetailsDefinition, IReportFilter } from "api/reportModels";
import { IBaseTableResponseModel } from "api/requestModels";
import TableCellDate from "components/tableCellComponents/tableCellDate/tableCellDate";
import TableCellDefault from "components/tableCellComponents/tableCellDefault/tableCellDefault";
import { t } from "i18next";
import { nameof } from "ts-simple-nameof";
import { DetailsRowTypeFormatterEnum, FilterTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

export interface IUsersModel extends IBaseTableResponseModel {
    data: Array<IGetUsersResponseListData>;
}

interface IGetUsersResponseListData {
    id: number;
    name: string;
    email: string;
    createdTime: string;
}

const columnHelper = createColumnHelper<IGetUsersResponseListData>();
export const usersColumnDefinition: any = [
    columnHelper.accessor(x => x.id, {
        id: nameof<IGetUsersResponseListData>(x => x.id),
        header: () => t(StringResources.pages.users.id),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: false },
    }),
    columnHelper.accessor(x => x.name, {
        id: nameof<IGetUsersResponseListData>(x => x.name),
        header: () => t(StringResources.pages.users.name),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.email, {
        id: nameof<IGetUsersResponseListData>(x => x.email),
        header: () => t(StringResources.pages.users.email),
        cell: info => TableCellDefault({ value: info.getValue() }),
        meta: { visible: true },
    }),
    columnHelper.accessor(x => x.createdTime, {
        id: nameof<IGetUsersResponseListData>(x => x.createdTime),
        header: () => t(StringResources.pages.users.createdTime),
        cell: info => TableCellDate({ value: info.getValue() }),
        meta: { visible: true, sortDefault: "desc" },
    }),
];

export const usersDetailsDefinition: IReportDetailsDefinition<IGetUsersResponseListData> = {
    details: [
        {
            key: nameof<IGetUsersResponseListData>(x => x.id),
            rowType: DetailsRowTypeFormatterEnum.Id,
            label: StringResources.pages.users.id,
        },
        {
            key: nameof<IGetUsersResponseListData>(x => x.name),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.users.name,
        },
        {
            key: nameof<IGetUsersResponseListData>(x => x.email),
            rowType: DetailsRowTypeFormatterEnum.Text,
            label: StringResources.pages.users.email,
        },
    ],
};

export const usersFilterDefinitions: IReportFilter[] = [
    {
        field: "name",
        title: StringResources.pages.users.name,
        filterType: FilterTypeEnum.TextFilter,
    },
];

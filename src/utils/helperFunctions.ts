import { AsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import TableCellCurrency from "components/tableCellComponents/tableCellCurrency/tableCellCurrency";
import TableCellDate from "components/tableCellComponents/tableCellDate/tableCellDate";
import { ExportType, PermissionType, StatementNotificationType, SupportedLanguageEnum } from "./enums";
import i18n from "./language/languageClient";
import { ILookupResponse } from "./models";
import { IPortalRouteElement, PortalRouteElements } from "./routing/pathsAndElements";
import { nameof } from "ts-simple-nameof";

export async function executeContainerThunkDispatch<ReturnType, ArgumentType>(
    containerDispatch: ThunkDispatch<any, any, any>,
    thunkAction: AsyncThunk<ReturnType, ArgumentType, {}>,
    args: ArgumentType
) {
    let isValid = false;
    let error = undefined;
    let data = {} as ReturnType;

    try {
        data = await containerDispatch(thunkAction(args)).unwrap();
        isValid = true;
    } catch (exception) {
        error = exception;
    }

    return { data, isValid, error };
}

export const devConsoleLog = (param1?: any, param2?: any) => {
    //process.env.NODE_ENV != "production" && console.log(param1, param2);
};

export const devConsoleError = (param1?: any, param2?: any) => {
    process.env.NODE_ENV != "production" && console.error(param1, param2);
};

export const devConsoleAssert = (condition: boolean) => {
    process.env.NODE_ENV != "production" && console.assert(condition);
};

export const getLanguages = (): ILookupResponse<number>[] => {
    return [
        { value: 1, name: SupportedLanguageEnum[SupportedLanguageEnum.English] },
    ];
};

export function createUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const handleChangeLanguage = (lng: string) => {
    localStorage.setItem("lng", lng);
    i18n.changeLanguage(lng);
};

export function propOf<T extends Object>(selector: (obj: T) => any): keyof T {
    return nameof(selector) as keyof T;
}
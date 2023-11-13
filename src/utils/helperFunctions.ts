import { AsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { nameof } from "ts-simple-nameof";
import i18n from "./language/languageClient";
import { ExportType, SupportedLanguageEnum } from "utils/enums";
import { ExportMetadata, ILookupResponse } from "utils/models";

export const getLanguages = (): ILookupResponse<number>[] => {
    return [
        { value: 1, name: SupportedLanguageEnum[SupportedLanguageEnum.English] },
        { value: 2, name: SupportedLanguageEnum[SupportedLanguageEnum.Hrvatski] },
    ];
};

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
    process.env.NODE_ENV != "production" && console.log(param1, param2);
};

export const devConsoleError = (param1?: any, param2?: any) => {
    process.env.NODE_ENV != "production" && console.error(param1, param2);
};

export const devConsoleAssert = (condition: boolean) => {
    process.env.NODE_ENV != "production" && console.assert(condition);
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

export const getColumnWidth = (data: Array<any>, accessor: string, header: any) => {
    if (data.length) {
        const maxWidth = 600;
        const padding = 35;
        const spacingDate = 5;
        const spacingString = 9;
        const headerText = typeof header === "function" ? header() : header;

        const cell = data[0];
        const cellLength = Math.max(...data.map(row => (`${row[accessor]}` || "").length), headerText.length);

        // If its header is longer than the cell, we just set width by length.
        if (cellLength == headerText.length) {
            return Math.min(maxWidth, cellLength * spacingString + padding);
        }

        // If its a number.
        if (typeof cell[accessor] === "number" || !isNaN(Number(cell[accessor]))) {
            return Math.min(maxWidth, cellLength * spacingString + padding);
        }

        // If its a date.
        if (!isNaN(Date.parse(cell[accessor]))) {
            return Math.min(maxWidth, cellLength * spacingDate + padding);
        }

        // Default width.
        return Math.min(maxWidth, cellLength * spacingString + padding);
    }
};

export function getFileMetada(exportType: ExportType): ExportMetadata {
    const pad2 = (n: number) => {
        return n < 10 ? "0" + n : n;
    };

    const date = new Date();
    const filename =
        date.getFullYear().toString() +
        pad2(date.getMonth() + 1) +
        pad2(date.getDate()) +
        pad2(date.getHours()) +
        pad2(date.getMinutes()) +
        pad2(date.getSeconds());

    switch (exportType) {
        case ExportType.CSV:
            return {
                filename: `${filename}.csv`,
                contentType: "text/csv",
            };
        case ExportType.XLSX:
            return {
                filename: `${filename}.xlsx`,
                contentType: "application/octet-stream",
            };
    }
}

export function saveFile(data: any, filename: string, type: string) {
    const file = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}

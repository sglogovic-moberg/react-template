import { IColumnVisibility } from "redux/models/reportModels";
import { PageTypeEnum } from "utils/enums";
import { IPageSettings } from "utils/models";

export const getToken = (): string => {
    const storage = getUserLocalStorageData();

    return storage?.data?.token;
};

export const getRefreshToken = () => {
    const storage = getUserLocalStorageData();

    return storage?.data?.refreshToken;
};

function getUserLocalStorageData() {
    const stored = localStorage.getItem("user");
    if (!stored) {
        return undefined;
    }
    return JSON.parse(stored);
}

export function setUserLocalStorageData(data: any) {
    localStorage.setItem(
        "user",
        JSON.stringify({
            data,
        })
    );
}

export function removeUserLocalStorageData() {
    localStorage.removeItem("user");
}

export const setRedirectToLastRoute = (value: boolean) => {
    sessionStorage.setItem("redirectToLastRoute", value.toString());
};

export const getRedirectToLastRoute = (): boolean => {
    const stored = sessionStorage.getItem("redirectToLastRoute");
    return /true/i.test(stored || "true"); // default true
};

export const setPageSize = (pageSize: number) => {
    localStorage.setItem("pageSize", pageSize.toString());
};

export const getPageSize = (): number => {
    const stored = localStorage.getItem("pageSize");
    if (!stored) {
        return 25;
    }

    return parseInt(stored);
};

export const getPageSettings = (pageType: PageTypeEnum): IPageSettings | null => {
    const stored = localStorage.getItem(pageType);
    if (!stored) {
        return null;
    }

    return Object.assign(new IPageSettings(), JSON.parse(stored));
};

export const setPageSettings = (pageType: PageTypeEnum, columns: IColumnVisibility[]) => {
    let pageSettings = getPageSettings(pageType);
    if (!pageSettings) {
        pageSettings = { pageType, columns: [] };
    }
    pageSettings.columns = columns;

    localStorage.setItem(pageType, JSON.stringify(pageSettings));
};

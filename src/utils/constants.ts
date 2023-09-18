import { baseApi } from "api/baseApi";
import { modalSliceName } from "redux/reducers/modalReducer";

export const reduxAction = {
    resetStore: "store/reset",
};

export const ignoreLoader = [
    baseApi.reducerPath,
    modalSliceName,
    "auth/adminLogin",
    "auth/authAdmin",
    "payment/getPaymentSettlementBreakdown",
    "settlement/getTransactionBatchesInSettlement",
    "dashboard/getDashboardData",
    "dispute/getDisputes",
];

export const mobileScreenResolution = "(max-width: 768px)";

export const defaultSeriesColorPallet = [
    "#C5F1FF",
    "#78B2FF",
    "#DB78FF",
    "#FF78C9",
    "#FF7878",
    "#FFA578",
    "#FAF751",
    "#C3F363",
    "#BCE6F3",
    "#6698D9",
    "#8166D9",
    "#BA66D9",
    "#D966AB",
    "#D96666",
    "#D98C66",
    "#D9D766",
    "#B2D966",
];

export const maxNumberOfItemsToExport = 100_000;

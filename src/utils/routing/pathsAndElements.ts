import React from "react";
import { StringResources } from "utils/language/languageResource";
import { PATHS } from "./paths";
const DashboardLazy = React.lazy(() => import("../../pages/dashboard/dashboard"));
const PaymentsLazy = React.lazy(() => import("../../pages/payments/payments"));
const TerminalsLazy = React.lazy(() => import("../../pages/terminals/terminals"));
const AgreementsLazy = React.lazy(() => import("../../pages/agreements/agreements"));
const DailyBalanceLazy = React.lazy(() => import("../../pages/dailyBalance/dailyBalance"));
const SettlementsLazy = React.lazy(() => import("../../pages/settlements/settlements"));
const BatchesLazy = React.lazy(() => import("../../pages/batches/batches"));
const TransactionsLazy = React.lazy(() => import("../../pages/transactions/transactions"));
const AuthorizationsLazy = React.lazy(() => import("../../pages/authorizations/authorizations"));
const DisputesLazy = React.lazy(() => import("../../pages/disputes/disputes"));
const EmployeesLazy = React.lazy(() => import("../../pages/employees/employees"));
const ElectronicDocumentsLazy = React.lazy(() => import("../../pages/electronicDocuments/electronicDocuments"));
const LoginLazy = React.lazy(() => import("../../pages/login/login"));
const ForgotPasswordLazy = React.lazy(() => import("../../pages/forgotPassword/forgotPassword"));
const ResetPasswordLazy = React.lazy(() => import("../../pages/resetPassword/resetPassword"));
const ConfirmAccountLazy = React.lazy(() => import("../../pages/confirmAccount/confirmAccount"));
const NotFoundLazy = React.lazy(() => import("../../pages/notFound/notFound"));

import {
    DashboardIcon,
    PaymentsIcon,
    TerminalsIcon,
    AgreementsIcon,
    SettlementsIcon,
    BatchesIcon,
    TransactionsIcon,
    AuthorizationsIcon,
    DocumentsIcon,
    UsersIcon,
    DailyBalancesIcon,
    DisputesIcon,
    NotificationDotIcon,
} from "components/icons";
import { PermissionType } from "utils/enums";
import { IconSVGProps } from "components/icons/types";

export const globalElements = [
    {
        path: PATHS.Global.Login,
        element: LoginLazy,
    },
    {
        path: PATHS.Global.ForgotPassword,
        element: ForgotPasswordLazy,
    },
    {
        path: PATHS.Global.ResetPassword,
        element: ResetPasswordLazy,
    },
    {
        path: PATHS.Global.ConfirmAccount,
        element: ConfirmAccountLazy,
    },
    {
        path: PATHS.Global.NotFound,
        element: NotFoundLazy,
    },
];

export const PortalWrapperLazy = React.lazy(() => import("../../containers/layout/wrappers/portalWrapper"));

export interface IPortalRouteElement {
    path: string;
    label: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    icon: ({ height, width }: IconSVGProps) => JSX.Element;
    permission: PermissionType;
    notificationIcon?: ({ height, width }: IconSVGProps) => JSX.Element;
}

export const PortalRouteElements: IPortalRouteElement[] = [
    {
        path: PATHS.Portal.Dashboard,
        label: StringResources.mainNavigation.dashboard,
        element: DashboardLazy,
        icon: DashboardIcon,
        permission: PermissionType.DashboardRead,
    },
    {
        path: PATHS.Portal.Payments,
        label: StringResources.mainNavigation.payments,
        element: PaymentsLazy,
        icon: PaymentsIcon,
        permission: PermissionType.PaymentsRead,
    },
    {
        path: PATHS.Portal.Terminals,
        label: StringResources.mainNavigation.terminals,
        element: TerminalsLazy,
        icon: TerminalsIcon,
        permission: PermissionType.TerminalsRead,
    },
    {
        path: PATHS.Portal.Agreements,
        label: StringResources.mainNavigation.agreements,
        element: AgreementsLazy,
        icon: AgreementsIcon,
        permission: PermissionType.AgreementsRead,
    },
    {
        path: PATHS.Portal.DailyBalance,
        label: StringResources.mainNavigation.dailyBalance,
        element: DailyBalanceLazy,
        icon: DailyBalancesIcon,
        permission: PermissionType.AgreementsRead,
    },
    {
        path: PATHS.Portal.Settlements,
        label: StringResources.mainNavigation.settlements,
        element: SettlementsLazy,
        icon: SettlementsIcon,
        permission: PermissionType.SettlementsRead,
    },
    {
        path: PATHS.Portal.Batches,
        label: StringResources.mainNavigation.batches,
        element: BatchesLazy,
        icon: BatchesIcon,
        permission: PermissionType.BatchesRead,
    },
    {
        path: PATHS.Portal.Transactions,
        label: StringResources.mainNavigation.transactions,
        element: TransactionsLazy,
        icon: TransactionsIcon,
        permission: PermissionType.TransactionsRead,
    },
    {
        path: PATHS.Portal.Authorizations,
        label: StringResources.mainNavigation.authorizations,
        element: AuthorizationsLazy,
        icon: AuthorizationsIcon,
        permission: PermissionType.AuthorizationsRead,
    },
    {
        path: PATHS.Portal.ElectronicDocuments,
        label: StringResources.mainNavigation.electronicDocuments,
        element: ElectronicDocumentsLazy,
        icon: DocumentsIcon,
        permission: PermissionType.StatementsRead,
    },
    {
        path: PATHS.Portal.Disputes,
        label: StringResources.mainNavigation.disputes,
        element: DisputesLazy,
        icon: DisputesIcon,
        permission: PermissionType.DisputesRead,
        notificationIcon: NotificationDotIcon,
    },
    {
        path: PATHS.Portal.Users,
        label: StringResources.mainNavigation.users,
        element: EmployeesLazy,
        icon: UsersIcon,
        permission: PermissionType.UsersRead,
    },
];

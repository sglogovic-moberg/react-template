import React from "react";

import { IconSVGProps } from "components/icons/types";
import DashboardIcon from "components/icons/dashboardIcon";
export const PortalWrapperLazy = React.lazy(() => import("../../components/wrappers/portalWrapper"));

export const globalElements: IGlobalElement[] = [
    {
        path: "/login",
        element: React.lazy(() => import("pages/login/login")),
    },
];

export interface IGlobalElement {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
}
export interface IPortalRouteElement {
    path: string;
    label: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    icon: ({ height, width }: IconSVGProps) => JSX.Element;
}

export const PortalRouteElements: IPortalRouteElement[] = [
    {
        path: "/",
        label: "Home",
        element: React.lazy(() => import("pages/portal/portal")),
        icon: DashboardIcon,
    },
    {
        path: "/posts",
        label: "Posts",
        element: React.lazy(() => import("pages/posts/posts")),
        icon: DashboardIcon,
    },
];

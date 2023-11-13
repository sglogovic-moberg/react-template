import React from "react";

import { StringResources } from "utils/language/languageResource";
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
}

export const PortalRouteElements: IPortalRouteElement[] = [
    {
        path: "/",
        label: StringResources.pages.dashboard.title,
        element: React.lazy(() => import("pages/portal/portal")),
    },
    {
        path: "/posts",
        label: StringResources.pages.posts.title,
        element: React.lazy(() => import("pages/posts/posts")),
    },
    {
        path: "/users",
        label: StringResources.pages.users.title,
        element: React.lazy(() => import("pages/users/users")),
    },
];

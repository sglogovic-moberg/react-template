import "hammerjs";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "redux/store";
import { PermissionType } from "utils/enums";
import { PATHS } from "utils/routing/paths";
import { globalElements, PortalRouteElements, PortalWrapperLazy } from "utils/routing/pathsAndElements";
import GlobalRoutesWrapper from "./wrappers/globalRoutesWrapper";
import { FallbackComponent } from "./fallbackComponent";

const SettingsLazy = React.lazy(() => import("../../pages/settings/settings"));
const TermsOfServiceLazy = React.lazy(() => import("../../pages/termsOfService/termsOfService"));
const NotFoundLazy = React.lazy(() => import("../../pages/notFound/notFound"));

const MainLayout = () => {
    const userPermissions = useSelector((state: RootState) => state.user.permissions);
    const selectedMerchant = useSelector((state: RootState) => state.user.selectedMerchant);

    const hasMerchantvalidTerms = selectedMerchant?.hasAtLeastOneAcceptedTerms;
    return (<Suspense fallback={<FallbackComponent />}>
        <Routes>
            {globalElements.map(element => {
                return (
                    <Route
                        key={element.path}
                        path={element.path}
                        element={
                            <GlobalRoutesWrapper>
                                <element.element />
                            </GlobalRoutesWrapper>
                        }
                    />
                );
            })}
            <Route path={PATHS.Portal.Index} element={<PortalWrapperLazy />}>
                {userPermissions.length &&
                    PortalRouteElements.map(element => {
                        const hasPermissions = userPermissions.some(x => x === PermissionType[element.permission]);
                        return (
                            <Route
                                key={element.path}
                                path={element.path}
                                element={hasPermissions ? <element.element /> : <NotFoundLazy />}
                            />
                        );
                    })}

                <Route
                    path={PATHS.Portal.Settings}
                    element={<SettingsLazy />}
                />

                {!hasMerchantvalidTerms && (
                    <Route
                        index
                        element={<TermsOfServiceLazy />}
                    />
                )}
                <Route
                    path={"*"}
                    element={<TermsOfServiceLazy />}
                />
            </Route>
        </Routes>
    </Suspense>
    );
};

export default MainLayout;

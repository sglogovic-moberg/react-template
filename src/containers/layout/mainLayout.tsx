import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PATHS } from "utils/routing/paths";
import { PortalRouteElements, PortalWrapperLazy, globalElements } from "utils/routing/pathsAndElements";
import { FallbackComponent } from "./fallbackComponent";
import GlobalRoutesWrapper from "components/wrappers/globalRoutesWrapper";

const MainLayout = () => {
    return (
        <Suspense fallback={<FallbackComponent />}>
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
                    {PortalRouteElements.map(element => {
                        return <Route key={element.path} path={element.path} element={<element.element />} />;
                    })}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default MainLayout;

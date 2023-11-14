import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PATHS } from "utils/routing/paths";
import { PortalRouteElements, PortalWrapperLazy, globalElements } from "utils/routing/pathsAndElements";
import { FallbackComponent } from "./fallbackComponent";
import GlobalRoutesWrapper from "components/wrappers/globalRoutesWrapper";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const MainLayout = () => {
    const currentPermission = useSelector((state: RootState) => state.auth.userRole);
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
                        if (element.permission && element.permission !== currentPermission) {
                            return;
                        }
                        return <Route key={element.path} path={element.path} element={<element.element />} />;
                    })}
                </Route>
                <Route path="*" element={<Navigate to={PATHS.Portal.Index} state={{ from: location }} />}></Route>
            </Routes>
        </Suspense>
    );
};

export default MainLayout;

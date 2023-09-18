import classNames from "classnames";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState, useAppDispatch } from "redux/store";
import { LoginStateEnum } from "utils/enums";
import { PATHS } from "utils/routing/paths";
import "./portalWrapper.scss";
import { FallbackComponent } from "containers/layout/fallbackComponent";

const PortalWrapper = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const authLoginState = useSelector((state: RootState) => state.auth.loginState);

    useEffect(() => {
        if (authLoginState === LoginStateEnum.LoggedIn) {
        }
    }, []);

    return (
        <>
            {authLoginState === LoginStateEnum.LoggedIn && (
                <>
                    <main role="main" className={classNames("app-content")}>
                        <Suspense fallback={<FallbackComponent />}>
                            <Outlet />
                        </Suspense>
                    </main>
                </>
            )}

            {authLoginState !== LoginStateEnum.LoggedIn && (
                <Navigate to={PATHS.Global.Login} state={{ from: location }} />
            )}
        </>
    );
};

export default PortalWrapper;

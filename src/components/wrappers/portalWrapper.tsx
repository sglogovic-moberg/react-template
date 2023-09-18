import classNames from "classnames";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState, useAppDispatch } from "redux/store";
import { LoginStateEnum } from "utils/enums";
import { PATHS } from "utils/routing/paths";
import { FallbackComponent } from "containers/layout/fallbackComponent";
import AppHeader from "containers/appHeader/appHeader";
import "./portalWrapper.scss";

const PortalWrapper = () => {
    const location = useLocation();
    const authLoginState = useSelector((state: RootState) => state.auth.loginState);
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
    const toggleHeaderExpandedState = () => {
        setIsHeaderExpanded(!isHeaderExpanded);
    };

    useEffect(() => {
        if (authLoginState === LoginStateEnum.LoggedIn) {
            // initial fetch data.
        }
    }, []);

    return (
        <>
            {authLoginState === LoginStateEnum.LoggedIn && (
                <>
                    <AppHeader toggleHeaderExpandedState={toggleHeaderExpandedState} />
                    <main
                        role="main"
                        className={classNames("app-content", {
                            "app-content--with-header-expanded": isHeaderExpanded,
                        })}
                    >
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

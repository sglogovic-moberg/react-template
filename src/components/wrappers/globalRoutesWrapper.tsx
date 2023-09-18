import { FallbackComponent } from "containers/layout/fallbackComponent";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import { LoginStateEnum } from "utils/enums";
import { PATHS } from "utils/routing/paths";
import { getRedirectToLastRoute, setRedirectToLastRoute } from "utils/storageActions";

interface GlobalRoutesWrapperProps {
    children: React.ReactNode;
}
const GlobalRoutesWrapper = ({ children }: GlobalRoutesWrapperProps) => {
    const loginState = useSelector((state: RootState) => state.auth.loginState);
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggin = loginState == LoginStateEnum.LoggedIn;

    useEffect(() => {
        if (isLoggin) {
            const locationState = location.state as any;
            const redirect = getRedirectToLastRoute();

            if (redirect && locationState?.from) {
                navigate(locationState.from, { replace: true });
            } else {
                setRedirectToLastRoute(true);
                navigate(PATHS.Portal.Index);
            }
        }
    }, [loginState]);

    return <Suspense fallback={<FallbackComponent />}>{!isLoggin && children}</Suspense>;
};

export default GlobalRoutesWrapper;

import BaseToastContainer from "containers/baseToastContainer/baseToastContainer";
import MainLoader from "containers/mainLoader/mainLoader";
import BaseModalContainer from "containers/modalContainers/baseModalContainer";
import "hammerjs";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { authAdminThunk } from "redux/actions/authActions";
import { useAppDispatch } from "redux/store";
import MainLayout from "containers/layout/mainLayout";
import { ErrorBoundary } from "containers/errorBoundary/errorBoundary";
import { useSearchParams } from "react-router-dom";
import { removeUserLocalStorageData } from "utils/storageActions";

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const impersonateLoginRequestToken = searchParams.get("token");

    // See if user can reconnect (from local storage token).
    useEffect(() => {
        // if its a impersonate login request, remove user data from local storage.
        if (impersonateLoginRequestToken) {
            removeUserLocalStorageData();
            setIsReady(true);
        } else {
            dispatch(authAdminThunk()).then(() => {
                setIsReady(true);
            });
        }
    }, []);

    return (
        <div className="app">
            <ErrorBoundary>
                <MainLoader />
                {isReady && (
                    <>
                        <BaseModalContainer />
                        <BaseToastContainer />
                        <MainLayout />
                    </>
                )}
            </ErrorBoundary>
        </div>
    );
};

export default App;

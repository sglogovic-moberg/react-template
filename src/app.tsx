import BaseToastContainer from "containers/baseToastContainer/baseToastContainer";
import MainLayout from "containers/layout/mainLayout";
import MainLoader from "containers/mainLoader/mainLoader";
import BaseModalContainer from "containers/modalContainers/baseModalContainer";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { authAdminThunk } from "redux/actions/authActions";
import { useAppDispatch } from "redux/store";
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
            <MainLoader />
            {isReady && (
                <>
                    <BaseModalContainer />
                    <BaseToastContainer />
                    <MainLayout />
                </>
            )}
        </div>
    );
};

export default App;

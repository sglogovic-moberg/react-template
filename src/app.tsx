import AppLoader from "containers/appLoader/appLoader";
import BaseToastContainer from "containers/baseToastContainer/baseToastContainer";
import MainLayout from "containers/layout/mainLayout";
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

    // See if user can reconnect (from local storage token).
    useEffect(() => {
        dispatch(authAdminThunk()).then(() => {
            setIsReady(true);
        });
    }, []);

    return (
        <div className="app">
            <AppLoader />
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

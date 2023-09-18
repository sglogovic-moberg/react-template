import { ToastContainer } from "react-toastify";
import "./baseToastContainer.scss";

const BaseToastContainer = () => (
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss={false}
        className={"straumur-toast"}
    />
);

export default BaseToastContainer;

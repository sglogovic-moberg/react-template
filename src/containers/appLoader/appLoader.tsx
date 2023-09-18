import classNames from "classnames";
import { useSelector } from "react-redux";
import { displayLoaderSelector } from "redux/selectors/authSelectors";
import { RootState } from "redux/store";
import "./appLoader.scss";

export function AppLoader() {
    const isLoading = useSelector((state: RootState) => displayLoaderSelector(state));
    return (
        <div
            className={classNames("app-loader", {
                show: isLoading.length > 0,
            })}
        >
            <div className="app-loader-spinner">
                Loading
                <div className="spinner-sector spinner-sector-red"></div>
                <div className="spinner-sector spinner-sector-blue"></div>
                <div className="spinner-sector spinner-sector-green"></div>
            </div>
        </div>
    );
}

export default AppLoader;

import BlurLoader from "components/baseLoader/blurLoader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { displayLoaderSelector } from "redux/selectors/authSelectors";
import { RootState } from "redux/store";

export function MainLoader() {
    const isLoading = useSelector((state: RootState) => displayLoaderSelector(state));
    const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);

    useEffect(() => {
        const setLoaderTimeout = setTimeout(() => {
            setIsLoaderVisible(isLoading.length > 0);
        }, 50);

        return () => {
            clearTimeout(setLoaderTimeout);
        };
    }, [isLoading]);

    if (!isLoaderVisible) {
        return <></>;
    }

    return <BlurLoader />;
}

export default MainLoader;

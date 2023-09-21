import InfoDrawer from "components/infoDrawer/infoDrawer";
import ReportDetails from "containers/reportDetails/reportDetails";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { clearActiveRow } from "redux/reducers/reportReducer";
import { RootState, useAppDispatch } from "redux/store";

const GlobalDetails = () => {
    const dispatch = useAppDispatch();
    const detailsData = useSelector((state: RootState) => state.report.activeRow);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const onCloseDrawer = () => {
        if (detailsData != null) {
            dispatch(clearActiveRow());
            return;
        }

        setIsDrawerOpen(false);
    };

    useEffect(() => {
        setIsDrawerOpen(detailsData != null);
    }, [detailsData]);

    return <InfoDrawer content={<ReportDetails />} isOpen={isDrawerOpen} onCloseDrawer={onCloseDrawer} />;
};

export default GlobalDetails;

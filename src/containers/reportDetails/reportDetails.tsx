import ReportDetailsBody from "containers/reportDetails/reportDetailsBody";
import ReportDetailsSections from "containers/reportDetails/reportDetailsSections";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isTableLoadingSelector } from "redux/selectors/authSelectors";
import { RootState } from "redux/store";
import "./reportDetails.scss";
import ReportDetailsHeader from "./reportDetailsHeader";

const ReportDetails = () => {
    const isDataLoading = useSelector((state: any) => isTableLoadingSelector(state));
    const detailsDefinitions = useSelector((state: RootState) => state.report.detailsDefinitions);
    const activeRowData = useSelector((state: RootState) => state.report.activeRow);

    return (
        <div className="report-details">
            {detailsDefinitions && <ReportDetailsHeader detailsDefinitions={detailsDefinitions} />}
            {!isDataLoading && detailsDefinitions && activeRowData && (
                <div className="report-details__body">
                    <ReportDetailsBody detailsDefinitions={detailsDefinitions} activeRowData={activeRowData} />
                    <div className="report-details__sections">
                        <ReportDetailsSections detailsDefinitions={detailsDefinitions} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportDetails;

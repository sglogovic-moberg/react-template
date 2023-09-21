import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { DetailHeaderEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";
import "./reportDetailsHeader.scss";
import { IReportDetailsDefinition } from "api/reportModels";

interface IReportDetailsHeaderProps {
    detailsDefinitions: IReportDetailsDefinition<any>;
}

const ReportDetailsHeader = ({ detailsDefinitions }: IReportDetailsHeaderProps) => {
    return <ReportDetailsHeaderHandler header={detailsDefinitions.header || DetailHeaderEnum.Default} />;
};

interface IReportDetailsHeaderHandler {
    header: DetailHeaderEnum;
}

const ReportDetailsHeaderHandler = (props: IReportDetailsHeaderHandler) => {
    const pageType = useSelector((state: RootState) => state.report.pageType);
    const { t } = useTranslation();

    switch (props.header) {
        case DetailHeaderEnum.Default:
            return (
                <div className="report-details__title">
                    <div className="report-details__title--label">{`${t(StringResources.pages[pageType].title)}`}</div>
                    <div className="report-details__title--action">
                        <>{/* {t(StringResources.report.print)} <DownloadIcon /> */}</>
                    </div>
                </div>
            );
        case DetailHeaderEnum.None:
            return <></>;
    }
};

export default ReportDetailsHeader;

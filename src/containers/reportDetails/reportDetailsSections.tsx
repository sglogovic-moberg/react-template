import { DetailSectionEnum } from "utils/enums";
import "./reportDetailsSections.scss";
import { IReportDetailsDefinition } from "api/reportModels";

interface IReportDetailsSectionsProps {
    detailsDefinitions: IReportDetailsDefinition<any>;
}

const ReportDetailsSections = ({ detailsDefinitions }: IReportDetailsSectionsProps) => {
    if (!detailsDefinitions.sections) {
        return <></>;
    }

    return (
        <>
            {detailsDefinitions.sections.map((detailSection, index) => (
                <ReportDetailsSectionHandler key={index} section={detailSection} />
            ))}
        </>
    );
};

interface IReportDetailsSectionHandler {
    section: DetailSectionEnum;
}

const ReportDetailsSectionHandler = (props: IReportDetailsSectionHandler) => {
    switch (props.section) {
        case DetailSectionEnum.Default:
            return <></>;
    }
};

export default ReportDetailsSections;

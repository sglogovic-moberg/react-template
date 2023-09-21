import { IReportDetailsDefinition, IReportDetailsModel } from "api/reportModels";
import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setDrillFilters } from "redux/reducers/reportReducer";
import { useAppDispatch } from "redux/store";
import { DetailsRowTypeFormatterEnum } from "utils/enums";
import { Datetime, formatter } from "utils/formatter";
import { StringResources } from "utils/language/languageResource";
import "./reportDetailsBody.scss";

interface IReportDetailsBodyProps {
    detailsDefinitions: IReportDetailsDefinition<any>;
    activeRowData: any;
}

const ReportDetailsBody = ({ detailsDefinitions, activeRowData }: IReportDetailsBodyProps) => {
    const idRow = detailsDefinitions.details.find(x => x.rowType === DetailsRowTypeFormatterEnum.Id);
    const idRowData = idRow ? activeRowData[idRow.key] : null;

    return (
        <>
            {idRow && idRowData && (
                <div className="report-details__body-id">
                    <div className="report-details__body-id--title">
                        {t(idRow.label)}: {idRowData}
                    </div>
                </div>
            )}
            {detailsDefinitions.details.map((detailDefinition, index) => {
                const activeRow = activeRowData[detailDefinition.key];

                // If no filter definition don't display row.
                // We displayed ID above everything else.
                if (
                    activeRow === null ||
                    activeRow === undefined ||
                    detailDefinition.rowType == DetailsRowTypeFormatterEnum.Id
                ) {
                    return;
                }

                // Grouped elements are displayed differently
                if (detailDefinition.groupId) {
                    const group = detailsDefinitions.details.filter(x => x.groupId === detailDefinition.groupId);

                    // Only display group first time.
                    if (group.findIndex(x => x.key === detailDefinition.key) > 0) {
                        return <React.Fragment key={index}></React.Fragment>;
                    }

                    const groupData = group.map(x => {
                        return {
                            data: activeRowData[x.key],
                            detailDefinition: x,
                        };
                    });

                    return (
                        <div className="report-details__body-group" key={`report-details__body-group-${index}`}>
                            {groupData.map((group, index) => (
                                <div className="report-details__body-row" key={`report-details__body-row-${index}`}>
                                    <div className="report-details__body-row--title">
                                        {`${t(group.detailDefinition.label)}`}
                                    </div>
                                    <ReportDetailsRowHandler
                                        value={group.data}
                                        rowData={activeRowData}
                                        detailDefinition={group.detailDefinition}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                }

                return (
                    <div className="report-details__body-row" key={detailDefinition.key}>
                        <div className="report-details__body-row--title">{`${t(detailDefinition.label)}`}</div>
                        <ReportDetailsRowHandler
                            value={activeRow}
                            rowData={activeRowData}
                            detailDefinition={detailDefinition}
                        />
                    </div>
                );
            })}
        </>
    );
};

interface IReportDetailsRowHandler {
    detailDefinition: IReportDetailsModel<any>;
    value: any; // prop value
    rowData: any; // row data
}

const ReportDetailsRowHandler = (props: IReportDetailsRowHandler) => {
    const { t } = useTranslation();

    switch (props.detailDefinition.rowType) {
        case DetailsRowTypeFormatterEnum.Drill:
            return <ReportDetailsDrillRow {...props} />;
        case DetailsRowTypeFormatterEnum.Boolean:
            return (
                <div className="report-details__body-row--data">
                    {props.value ? (
                        <>{`${t(StringResources.reportDetails.boolean.yesLabel)}`}</>
                    ) : (
                        <>{`${t(StringResources.reportDetails.boolean.noLabel)}`}</>
                    )}
                </div>
            );
        case DetailsRowTypeFormatterEnum.DateTime:
            return (
                <div className="report-details__body-row--data">
                    <>{formatter(props.value, (props.detailDefinition.format as Datetime) ?? "long")}</>
                </div>
            );
        case DetailsRowTypeFormatterEnum.Date:
            return (
                <div className="report-details__body-row--data">
                    <>{formatter(props.value, (props.detailDefinition.format as Datetime) ?? "date")}</>
                </div>
            );
        case DetailsRowTypeFormatterEnum.List:
            return (
                <div className="report-details__body-row--data">
                    {props.value.length > 0 ? props.value.join(", ") : "-"}
                </div>
            );
        default:
            return <div className="report-details__body-row--data">{props.value ?? "-"}</div>;
    }
};

const ReportDetailsDrillRow = (props: IReportDetailsRowHandler) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!props.detailDefinition.drill) {
        return <></>;
    }

    const onRedirectClickWithDrill = (value: any) => {
        return async () => {
            await dispatch(
                setDrillFilters([
                    {
                        field: props.detailDefinition.drill!.field,
                        value: value,
                    },
                ])
            );

            navigate(props.detailDefinition.drill!.page);
        };
    };

    if (Array.isArray(props.value) && props.value.length > 0) {
        return (
            <div className="report-details__body-row--list-data">
                {props.value
                    .map<React.ReactNode>((value, index) => {
                        return (
                            <div
                                key={index}
                                className="report-details__body-row--drill"
                                onClick={onRedirectClickWithDrill(value)}
                            >
                                {value}
                            </div>
                        );
                    })
                    .reduce((prev, curr) => [prev, " , ", curr])}
            </div>
        );
    }

    return (
        <div
            className="report-details__body-row--data report-details__body-row--drill"
            onClick={onRedirectClickWithDrill(props.value)}
        >
            {props.value}
        </div>
    );
};

export default ReportDetailsBody;

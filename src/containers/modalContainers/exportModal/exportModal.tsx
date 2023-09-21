import "./exportModal.scss";
import BaseModal from "components/baseModal/baseModal";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { StringResources } from "utils/language/languageResource";
import { ExportType, ExportColumn, ModalTypeEnum } from "utils/enums";
import { RootState, useAppDispatch } from "redux/store";
import { setModalData } from "redux/reducers/modalReducer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ReportColumnData } from "utils/models";
import BaseRadio from "components/baseRadio/baseRadio";

const ExportModal = () => {
    const [localExportType, setExportType] = useState<ExportType>(ExportType.XLSX);
    const [localExportColumn, setExportColumn] = useState<ExportColumn>(ExportColumn.All);
    const columnVisibility = useSelector((state: RootState) => state.report.columnVisibility);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        let exportColumns: Array<ReportColumnData> = [];
        exportColumns = columnVisibility
            .filter(x => (localExportColumn === ExportColumn.All ? true : x.visible))
            .map(x => {
                return { name: x.label, prop: x.id };
            });

        dispatch(
            setModalData({
                modalType: ModalTypeEnum.Export,
                data: {
                    exportType: localExportType,
                    exportColumns: exportColumns,
                },
            })
        );
    }, [localExportType, localExportColumn]);

    const onExportTypeChange = (key: ExportType) => {
        setExportType(key);
    };

    const onExportColumnChange = (key: ExportColumn) => {
        setExportColumn(key);
    };

    return (
        <BaseModal
            title={t(StringResources.export.title)}
            modalType={ModalTypeEnum.Export}
            actionButtonText={t(StringResources.export.confirm)}
            closeButtonText={t(StringResources.export.close)}
        >
            <div className="export-label">{`${t(StringResources.export.exportType)}`}</div>
            <div className="export-label"></div>
            <div className="d-flex mb-4">
                {Object.values(ExportType).map((value: ExportType) => {
                    const labelStringResource =
                        value == ExportType.CSV
                            ? StringResources.export.exportTypeCSV
                            : StringResources.export.exportTypeXLSX;
                    return (
                        <BaseRadio
                            key={`group1_${value}`}
                            label={t(labelStringResource)}
                            name="group1"
                            value={value}
                            onChange={onExportTypeChange}
                            checked={localExportType === value}
                            className="export-radio-button-group"
                        />
                    );
                })}
            </div>
            <div className="export-label">{`${t(StringResources.export.exportColumn)}`}</div>
            <div className="d-flex flex-column">
                {Object.values(ExportColumn).map((value: ExportColumn, index: number) => {
                    const labelStringResource =
                        value == ExportColumn.All
                            ? StringResources.export.exportAllColumns
                            : StringResources.export.exportVisibleColumns;
                    return (
                        <BaseRadio
                            key={`group2_${value}`}
                            label={t(labelStringResource)}
                            name="group2"
                            value={value}
                            onChange={onExportColumnChange}
                            checked={localExportColumn === value}
                            className={`export-radio-button-group ${index === 0 ? "mb-2" : ""}`}
                        />
                    );
                })}
            </div>
        </BaseModal>
    );
};

export default ExportModal;

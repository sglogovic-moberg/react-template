import { IReportFilter } from "api/reportModels";
import BaseDatepicker from "components/baseDatePicker/baseDatepicker";
import BaseInput from "components/baseInput/baseInput";
import { t } from "i18next";
import { FilterTypeEnum } from "utils/enums";

interface IFilterInputProps {
    filterConfig: IReportFilter;
    onValueChange: (newValue: any, field: string) => void;
    value?: any;
}

const FilterInputMapper = ({ filterConfig, onValueChange, value }: IFilterInputProps) => {
    const onInputChange = (e: any) => {
        onValueChange(e.target.value, filterConfig.field);
    };

    const onDatePickerChange = (valueDate: Date | undefined) => {
        onValueChange(valueDate?.toISOString(), filterConfig.field);
    };

    switch (filterConfig.filterType) {
        case FilterTypeEnum.TextFilter:
            return (
                <BaseInput type={"text"} label={`${t(filterConfig.title)}`} onChange={onInputChange} value={value} />
            );
        case FilterTypeEnum.NumberFilter:
            return (
                <BaseInput type={"number"} label={`${t(filterConfig.title)}`} onChange={onInputChange} value={value} />
            );
        case FilterTypeEnum.DateFilter:
            return (
                <BaseDatepicker
                    value={value ? new Date(value) : undefined}
                    onChange={onDatePickerChange}
                    label={`${t(filterConfig.title)}`}
                />
            );
        default:
            return <></>;
    }
};

export default FilterInputMapper;

import classNames from "classnames";
import DatePicker from "react-datepicker";
import "./baseDatepicker.scss";

import "react-datepicker/dist/react-datepicker.css";

interface BaseDatepickerProps {
    styleType?: "alpha" | "beta";
    label?: string;
    disabled?: boolean;
    onChange: (newDate?: Date) => void;
    onBlur?: any;
    value?: Date | null;
    maxDate?: Date;
    minDate?: Date;
    invalid?: string | boolean;
    name?: string;
    placeholder?: string;
}

const BaseDatepicker: React.FC<BaseDatepickerProps> = ({
    styleType = "alpha",
    disabled,
    label,
    value,
    onChange,
    maxDate,
    minDate,
    onBlur,
    invalid,
    name,
    placeholder,
}) => {
    const dateChangeHandler = (date: Date) => {
        onChange(date);
    };

    return (
        <div className={classNames(`base-datepicker base-datepicker--${styleType}`)}>
            {label && <label className="base-datepicker__label">{label}</label>}
            <DatePicker
                name={name}
                placeholderText={placeholder}
                className={"base-datepicker__input"}
                dateFormat="dd/MM/yyyy"
                disabled={disabled}
                calendarStartDay={1}
                maxDate={maxDate}
                minDate={minDate}
                selected={value}
                onChange={dateChangeHandler}
                popperPlacement="bottom-end"
                onBlur={onBlur}
                showIcon
                showYearDropdown
                showMonthDropdown
                yearDropdownItemNumber={40}
                shouldCloseOnSelect={true}
            />
            {invalid && <p className="base-datepicker__error">{invalid}</p>}
        </div>
    );
};
export default BaseDatepicker;

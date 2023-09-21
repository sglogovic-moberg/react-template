import "./baseRadio.scss";
import classNames from "classnames";
import Form from "react-bootstrap/Form";

interface IBaseRadioProps<T> {
    id?: string;
    label: string;
    name: string;
    checked: boolean;
    value: T;
    className?: string;
    onChange: (key: T) => void;
}

function BaseRadio<T>({ id, label, name, checked, value, className, onChange }: IBaseRadioProps<T>) {
    return (
        <Form.Check
            inline
            className={classNames("base-radio", className, {
                "base-radio--checked": checked,
            })}
            id={id || `${name}-${value}`}
        >
            <Form.Check.Input
                className={classNames("base-radio--input", {
                    "base-radio--input--checked": checked,
                })}
                name={name}
                checked={checked}
                value={value as unknown as string}
                onChange={e => {
                    onChange(value);
                }}
                type="radio"
            />
            <Form.Check.Label>{label}</Form.Check.Label>
        </Form.Check>
    );
}

export default BaseRadio;

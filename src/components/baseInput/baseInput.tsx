import classNames from "classnames";
import React, { ChangeEvent, FocusEvent } from "react";
import { StringResources } from "utils/language/languageResource";
import "./baseInput.scss";

type InputELement = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

type BaseInputProps = InputELement & {
    styleType?: "alpha" | "beta";
    label?: React.ReactNode;
    disabled?: boolean;
    name?: string;
    readonly?: boolean;
    invalid?: string | undefined | boolean;
};

const BaseInput: React.FC<BaseInputProps> = ({
    styleType = "alpha",
    value,
    id,
    label,
    onChange,
    children,
    type,
    disabled,
    name,
    readonly,
    invalid,
    onBlur,
    ...props
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e);
    };

    return (
        <div className={classNames(`base-input base-input--${styleType}`)}>
            {label && <label className="base-input__label">{label}</label>}
            <input
                className="base-input__input"
                type={type}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value ?? ""}
                id={id}
                readOnly={readonly}
                disabled={disabled}
                {...props}
            />
            {invalid && <p className="base-input__error">{invalid}</p>}
        </div>
    );
};

export default BaseInput;

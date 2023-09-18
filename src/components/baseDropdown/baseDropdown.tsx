import classNames from "classnames";
import { FC } from "react";
import { Dropdown } from "react-bootstrap";
import "./baseDropdown.scss";
import BaseButton from "components/baseButton/baseButton";

export interface Option {
    value: number | string;
    label: string;
    selected: boolean;
}

interface BaseDropdownProps {
    styleType?: "alpha" | "beta" | "gamma";
    title?: string;
    className?: string;
    toggleText: string;
    labelText?: string;
    children: React.ReactNode;
    invalid?: string | undefined | boolean;
    clearable?: boolean;
    onSelect: (eventKey: any, event: Object) => void;
}

const BaseDropdown: FC<BaseDropdownProps> = ({
    styleType = "alpha",
    title,
    className,
    toggleText,
    labelText,
    children,
    invalid,
    clearable,
    onSelect,
}) => {
    return (
        <div className={classNames(`base-dropdown base-dropdown--${styleType}`)}>
            {labelText && <label className="base-dropdown__label">{labelText}</label>}

            <Dropdown title={title} onSelect={onSelect}>
                <Dropdown.Toggle className={`base-dropdown__toggle-action ${toggleText != "" && "value-action"}`}>
                    {toggleText}
                    {clearable && toggleText != "" && (
                        <div className="d-flex justify-content-end">
                            <div onClick={() => onSelect("", "")}>X</div>
                        </div>
                    )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="base-dropdown__menu">{children}</Dropdown.Menu>
            </Dropdown>

            {invalid && <p className="base-dropdown__error">{invalid}</p>}
        </div>
    );
};

export default BaseDropdown;

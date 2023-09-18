import classNames from "classnames";
import "./baseButton.scss";

interface IBaseButtonProps {
    text?: string;
    handleClick?: () => void;
    type?: "button" | "submit";
    styleType: "solid" | "text" | "line";
    size?: "medium" | "small" | "full";
    disabled?: boolean;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    danger?: boolean;
    className?: string;
}

const BaseButton = ({
    text,
    handleClick,
    disabled,
    type = "button",
    styleType,
    size = "medium",
    leftIcon,
    rightIcon,
    danger,
    className,
}: IBaseButtonProps) => {
    const buttonTypeClass = `type--${styleType}`;
    const buttonSizeClass = `size--${size}`;
    return (
        <button
            type={type}
            disabled={disabled}
            className={classNames("base-button", buttonTypeClass, buttonSizeClass, className, {
                "--disabled": disabled,
                "--danger": danger,
                "left-icon": leftIcon,
                "right-icon": rightIcon,
            })}
            onClick={handleClick}
        >
            {leftIcon && leftIcon}
            {text && text}
            {rightIcon && rightIcon}
        </button>
    );
};

export default BaseButton;

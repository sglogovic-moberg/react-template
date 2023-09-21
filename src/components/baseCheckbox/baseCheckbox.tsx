import classNames from "classnames";
import { useEffect, useRef } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import "./baseCheckbox.scss";
import CheckIcon from "components/icons/checkIcon";
import ArrowIcon from "components/icons/arrowIcon";
import DashIcon from "components/icons/dashIcon";

interface IBaseCheckboxProps {
    id: string;
    label?: string;
    checked: boolean;
    intermediate?: boolean;
    labelBefore?: boolean;
    isReorderable?: boolean;
    draggableHandleProps?: DraggableProvidedDragHandleProps | null;
    onChange?: (id: string, checked: boolean) => void;
}

const BaseCheckbox = ({
    id,
    label,
    checked,
    intermediate = false,
    labelBefore = false,
    isReorderable = false,
    draggableHandleProps,
    onChange,
}: IBaseCheckboxProps) => {
    const checkRef = useRef<HTMLInputElement>(null);

    const onValueChange = () => {
        if (onChange) {
            onChange(id, !checked);
        }
    };

    useEffect(() => {
        if (checkRef.current) {
            checkRef.current.indeterminate = intermediate;
        }
    }, [intermediate, checkRef.current]);

    const reorderingProps = isReorderable ? draggableHandleProps : {};

    return (
        <label className={"base-checkbox"} {...reorderingProps}>
            {labelBefore && label && <BaseCheckboxLabel text={label} />}
            <div
                className={classNames("base-checkbox__checkmark ", {
                    "base-checkbox__checkmark--checked": checked || intermediate,
                })}
            >
                <div
                    className={classNames("checkbox-icon", {
                        "checkbox-icon--checked": checked || intermediate,
                    })}
                >
                    {checked && <CheckIcon />}
                    {intermediate && <DashIcon />}
                </div>
            </div>
            {!labelBefore && label && <BaseCheckboxLabel text={label} />}
            <input
                className="base-checkbox__input"
                type="checkbox"
                ref={checkRef}
                id={id}
                checked={checked}
                onChange={onValueChange}
            />
            {isReorderable && (
                <div className="base-checkbox__reorderable">
                    <ArrowIcon />
                    <ArrowIcon />
                </div>
            )}
        </label>
    );
};

interface BaseCheckboxLabelProps {
    text: string;
}

const BaseCheckboxLabel = ({ text }: BaseCheckboxLabelProps) => {
    if (!text) return <></>;
    return <span className="base-checkbox__text">{text}</span>;
};

export default BaseCheckbox;

import BaseButton from "components/baseButton/baseButton";
import { t } from "i18next";
import { StringResources } from "utils/language/languageResource";
import "./columnContentFooter.scss";

interface IColumnContentFooterProps {
    onSaveClick: () => void;
    onCancelClick: () => void;
    isSaveButtonDisabled: boolean;
}

const ColumnContentFooter = (props: IColumnContentFooterProps) => {
    return (
        <div className={"column-content-footer"}>
            <BaseButton
                handleClick={props.onSaveClick}
                disabled={props.isSaveButtonDisabled}
                text={`${t(StringResources.columnChooser.save)}`}
                styleType={"solid"}
                size="medium"
            />
            <BaseButton
                handleClick={props.onCancelClick}
                text={`${t(StringResources.columnChooser.cancel)}`}
                size="medium"
                styleType="text"
            />
        </div>
    );
};

export default ColumnContentFooter;

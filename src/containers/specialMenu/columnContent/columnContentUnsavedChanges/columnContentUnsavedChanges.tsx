import { t } from "i18next";
import { StringResources } from "utils/language/languageResource";
import "./columnContentUnsavedChanges.scss";
import ErrorWarningIcon from "components/icons/errorWarningIcon";

const ColumnContentUnsavedChanges = () => {
    return (
        <div className="column-content-unsaved-changes">
            <ErrorWarningIcon className={"column-chooser__warning-icon"} />
            <div className="column-content-unsaved-changes__text">{`${t(
                StringResources.columnChooser.unsavedChanges
            )}`}</div>
        </div>
    );
};

export default ColumnContentUnsavedChanges;

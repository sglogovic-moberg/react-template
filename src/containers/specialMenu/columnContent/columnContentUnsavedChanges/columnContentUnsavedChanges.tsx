import { t } from "i18next";
import { StringResources } from "utils/language/languageResource";
import "./columnContentUnsavedChanges.scss";

const ColumnContentUnsavedChanges = () => {
    return (
        <div className="column-content-unsaved-changes">
            <div className="column-content-unsaved-changes__text">{`${t(
                StringResources.columnChooser.unsavedChanges
            )}`}</div>
        </div>
    );
};

export default ColumnContentUnsavedChanges;

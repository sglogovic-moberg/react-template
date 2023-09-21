import BaseButton from "components/baseButton/baseButton";
import { t } from "i18next";
import { StringResources } from "utils/language/languageResource";
import "./filterFooter.scss";
import FilterClearIcon from "components/icons/filterClearIcon";

interface IFilterFooterProps {
    onFilterClick: () => void;
    onClearClick: () => void;
}

const FilterFooter = ({ onClearClick, onFilterClick }: IFilterFooterProps) => {
    return (
        <div className="filter-footer">
            <BaseButton
                handleClick={onClearClick}
                text={t(StringResources.filter.clear)}
                size={"medium"}
                styleType={"text"}
                danger={true}
                leftIcon={<FilterClearIcon className="filter-footer--filter-icon" />}
            />
            <BaseButton
                handleClick={onFilterClick}
                text={t(StringResources.filter.search)}
                size={"medium"}
                styleType={"solid"}
            />
        </div>
    );
};

export default FilterFooter;

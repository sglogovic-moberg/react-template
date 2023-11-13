import SpecialMenu from "components/specialMenus/specialMenu";
import FilterPanelBody from "containers/specialMenu/filter/filterContent/filterPanelContent";
import FilterFooter from "containers/specialMenu/filter/filterFooter/filterFooter";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setQueryFilters } from "redux/reducers/reportReducer";
import { RootState, useAppDispatch } from "redux/store";
import { mobileScreenResolution } from "utils/constants";
import { useMediaQuery, useModalManagement } from "utils/customHooks";
import { ModalTypeEnum } from "utils/enums";
import { StringResources } from "utils/language/languageResource";

const FilterSpecialMenu = () => {
    const dispatch = useAppDispatch();
    const filterDefinitions = useSelector((state: RootState) => state.report.filterDefinitions);
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);
    const [currentFilters, setCurrentFilters] = useState<any>(queryFilters);
    const [isSpecialMenuOpen, setIsSpecialMenuOpen] = useState(false);
    const isMobile = useMediaQuery(mobileScreenResolution);
    const modalManagement = useModalManagement();
    const [filterText, setFilterText] = useState(`${t(StringResources.filter.buttonText)}`);
    const [filterActive, setFilterActive] = useState(false);

    if (filterDefinitions.length === 0) {
        return <></>;
    }

    useEffect(() => {
        const activeFilters = Object.values(queryFilters).filter(x => x !== null && x !== undefined);
        const localActiveFilter = queryFilters && activeFilters.length > 0;
        setFilterActive(localActiveFilter);
        setFilterText(
            `${t(StringResources.filter.buttonText)} ${localActiveFilter ? ` (${activeFilters.length})` : ""}`
        );
    }, [queryFilters]);

    const onFilterClick = () => {
        dispatch(setQueryFilters(currentFilters));
    };

    const onClearClick = () => {
        setCurrentFilters({});
        dispatch(setQueryFilters({}));
    };

    const onFilterChange = (newValue: any, field: string) => {
        setCurrentFilters((prevState: any) => ({
            ...prevState,
            [field]: newValue,
        }));
    };

    const setSpecialMenuVisibilty = (isVisible: boolean) => {
        isMobile
            ? modalManagement.openModal({ modalType: ModalTypeEnum.SpecialMenuFilter })
            : setIsSpecialMenuOpen(isVisible);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            onFilterClick();
        }

        if (event.key === "Escape") {
            setIsSpecialMenuOpen(false);
        }
    };

    return (
        <div onKeyDown={isSpecialMenuOpen ? handleKeyDown : undefined} tabIndex={0} style={{ outline: "none" }}>
            <SpecialMenu
                text={filterText}
                isMenuOpen={isSpecialMenuOpen}
                setSpecialMenuVisibilty={setSpecialMenuVisibilty}
                bodyNode={
                    <FilterPanelBody
                        onFilterChange={onFilterChange}
                        currentFilters={currentFilters}
                        filterDefinitions={filterDefinitions}
                    />
                }
                footerNode={<FilterFooter onClearClick={onClearClick} onFilterClick={onFilterClick} />}
                isActive={filterActive}
            />
        </div>
    );
};

export default FilterSpecialMenu;

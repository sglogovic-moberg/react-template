import FilterInputMapper from "containers/specialMenu/filter/filterInputMapper/filterInputMapper";
import React from "react";
import "./filterPanelContent.scss";
import { IReportFilter } from "api/reportModels";

interface IFilterPanelBodyProps {
    onFilterChange: (newValue: any, field: string) => void;
    currentFilters: Record<string, any>;
    filterDefinitions: IReportFilter[];
}

const FilterPanelBody = (props: IFilterPanelBodyProps) => {
    const { currentFilters, filterDefinitions, onFilterChange } = props;

    const filterChangeHandler = (newValue: any, field: string) => {
        if (newValue === "") {
            newValue = undefined;
        }

        onFilterChange(newValue, field);
    };

    return (
        <div className="filter-panel">
            <div className="filter-panel__inputs">
                {filterDefinitions &&
                    filterDefinitions.map((filter, i) => {
                        if (filter.groupId) {
                            const groupedFilters = filterDefinitions.filter(x => x.groupId === filter.groupId);

                            // Only display group first time.
                            if (groupedFilters.findIndex(x => x.field === filter.field) > 0) {
                                return <React.Fragment key={`filter-panel__inputs-${i}`}></React.Fragment>;
                            }

                            return (
                                <div className="filter-panel__inputs-group" key={`filter-panel-inputs-group-${i}`}>
                                    {groupedFilters.map((group, index) => (
                                        <div
                                            className="filter-panel__inputs-row"
                                            key={`filter-panel__inputs-row-${index}`}
                                        >
                                            <FilterInputMapper
                                                filterConfig={group}
                                                onValueChange={filterChangeHandler}
                                                value={currentFilters[group.field]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        return (
                            <div key={i} className="filter-panel__inputs-row">
                                <FilterInputMapper
                                    filterConfig={filter}
                                    onValueChange={onFilterChange}
                                    value={currentFilters[filter.field]}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default FilterPanelBody;

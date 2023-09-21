import React from "react";

interface ITableCellDefaultProps {
    value: string | boolean | number | undefined | null;
}

const TableCellDefault = (props: ITableCellDefaultProps) => {
    const { value } = props;

    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return <>{value}</>;
};

export default TableCellDefault;

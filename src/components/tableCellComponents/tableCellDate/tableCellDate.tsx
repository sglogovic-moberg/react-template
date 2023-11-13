import { FC } from "react";
import { Datetime, formatter } from "utils/formatter";

interface ITableCellDateProps {
    value: string | null | undefined;
    format?: Datetime;
}

const TableCellDate: FC<ITableCellDateProps> = ({ value, format = "date" }) => {
    return <>{formatter(value, format)}</>;
};

export default TableCellDate;

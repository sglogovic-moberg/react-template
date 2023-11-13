import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { CriteriaString, SortCriterion, SortDirectionEnum } from "api/requestModels";
import classNames from "classnames";
import CustomPagination from "components/baseTable/customPagination/customPagination";
import BaseButton from "components/baseButton/baseButton";
import { useEffect, useState, useRef, forwardRef } from "react";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { IColumnVisibility } from "redux/models/reportModels";
import { isTableLoadingSelector } from "redux/selectors/authSelectors";
import { currentPageSortCriteriaSelector } from "redux/selectors/reportSelectors";
import { RootState } from "redux/store";
import { Trans } from "react-i18next";
import { t } from "i18next";
import { StringResources } from "utils/language/languageResource";
import { getColumnWidth } from "utils/helperFunctions";
import "./baseTable.scss";
import { useMediaQuery, useModalManagement } from "utils/customHooks";
import { ModalTypeEnum } from "utils/enums";
import { mobileScreenResolution } from "utils/constants";
import { IReportRowDefinitions } from "api/reportModels";
import SortIcon from "components/icons/sortIcon";

interface IBaseTableProps {
    isExportShown?: boolean;
    onExportBtnClick?: () => void;
    tableData?: Array<any>;
    totalCount?: number;
    setActiveRow: (rowId: number) => void;
    columnDefinition: ColumnDef<any, any>[];
    rowDefinitions?: IReportRowDefinitions<any>;
    columnVisibility: IColumnVisibility[];
    onPageChange: (pageNumber: number) => void;
    onSortChange: (sortCriteria?: string) => void;
    onPageSizeChange: (pageSize: number) => void;
    onColumnOrderChange: (newColumnOrder: IColumnVisibility[]) => void;
}

const BaseTable = forwardRef<any, IBaseTableProps>(function BaseTable(
    {
        columnDefinition,
        rowDefinitions,
        isExportShown,
        onExportBtnClick,
        tableData,
        totalCount,
        columnVisibility,
        setActiveRow,
        onPageChange,
        onPageSizeChange,
        onSortChange,
        onColumnOrderChange,
    }: IBaseTableProps,
    tbodyRef
) {
    const initialSortSelector = useSelector(currentPageSortCriteriaSelector);
    const activeRowIndex = useSelector((state: RootState) => state.report.activeRowIndex);
    const modalManagement = useModalManagement();
    const [sorting, setSorting] = useState<SortingState>(initialSortSelector);
    const isDataLoading = useSelector((state: any) => isTableLoadingSelector(state));
    const [dragOver, setDragOver] = useState("");
    const pageType = useSelector((state: RootState) => state.report.pageType);
    const queryFilters = useSelector((state: RootState) => state.report.queryParams.filters);
    const pageSize = useSelector((state: RootState) => state.report.queryParams.pageSize);
    const pageNumber = useSelector((state: RootState) => state.report.queryParams.pageNumber) ?? 0;
    const isMobile = useMediaQuery(mobileScreenResolution);

    const tableColumnVisibility: VisibilityState = {};
    columnVisibility.forEach(element => {
        tableColumnVisibility[element.id] = element.visible;
    });

    useEffect(() => {
        // Scroll active row into view if there was a row selected before.
        if (activeRowIndex) {
            document.getElementById(activeRowIndex.toString())?.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "center",
            });
        }
    }, []);

    const setActivePageIndex = (page: number) => {
        table.setPageIndex(page);
        onPageChange(page);
    };

    const setPageSize = (pageSize: number) => {
        table.setPageIndex(0);
        onPageSizeChange(pageSize);
    };

    const onRowClick = (index: number) => {
        return () => {
            setActiveRow(index);
        };
    };

    const handleRowClick = async (index: number) => {
        onRowClick(index);

        if (isMobile) {
            await modalManagement.openModal({ modalType: ModalTypeEnum.Details });
            setActiveRow(-1);
        }
    };

    useEffect(() => {
        if (sorting.length > 0) {
            const sortCriteria = CriteriaString.from(
                sorting.map(column => {
                    const sortCriterion: SortCriterion = {
                        sortColumn: column.id,
                        sortDirection: column.desc ? SortDirectionEnum.Descending : SortDirectionEnum.Ascending,
                    };
                    return sortCriterion;
                })
            ).toString();

            onSortChange(sortCriteria);
        } else {
            onSortChange(undefined);
        }
    }, [sorting]);

    const getVisibleColumnsOrdered = () => {
        const columnVisibilityIds = columnVisibility.map(x => x.id);

        return columnDefinition
            .map(column => ({
                ...column,
                size: getColumnWidth(tableData ?? [], column.id ?? "", column.header ?? ""),
            }))
            .sort((x, y) => columnVisibilityIds.indexOf(x.id!) - columnVisibilityIds.indexOf(y.id!));
    };

    const handleDragStart = (e: any) => {
        e.dataTransfer.setData(
            "colIndex",
            columnVisibility.findIndex(x => x.id == e.target.getAttribute("data-id"))
        );
    };

    const handleDragEnter = (e: any) => {
        setDragOver(e.target.getAttribute("data-id"));
    };

    const handleDragLeave = (e: any) => {
        if (dragOver == e.target.getAttribute("data-id")) {
            setDragOver("");
        }
    };

    const handleOnDrop = (e: any) => {
        if (e.target && e.target.getAttribute("data-id")) {
            const droppedColIdx = columnVisibility.findIndex(x => x.id == e.target.getAttribute("data-id"));
            const draggedColIdx = e.dataTransfer.getData("colIndex");
            const tempCols = [...columnVisibility];

            tempCols[draggedColIdx] = columnVisibility[droppedColIdx];
            tempCols[droppedColIdx] = columnVisibility[draggedColIdx];
            onColumnOrderChange(tempCols);
        }
    };

    const handleKeyDown = (e: any, row: any) => {
        e.stopPropagation();

        // @ts-ignore
        const currentRow = tbodyRef?.current?.children.namedItem(row.id);
        switch (e.key) {
            case "ArrowUp":
                currentRow?.previousElementSibling?.focus();

                // SD-471 - prevents table scrolling, focus will automatically scroll to the next/previous item
                e.preventDefault();
                break;
            case "ArrowDown":
                currentRow?.nextElementSibling?.focus();

                // SD-471 - prevents table scrolling, focus will automatically scroll to the next/previous item
                e.preventDefault();
                break;
            default:
                break;
        }
    };

    const table = useReactTable({
        data: tableData && tableData.length > 0 ? tableData : Array(25).fill({}),
        columns: getVisibleColumnsOrdered(),
        state: {
            columnVisibility: tableColumnVisibility,
            sorting,
            pagination: {
                pageIndex: pageNumber,
                pageSize: pageSize,
            },
        },
        manualSorting: true,
        manualPagination: true,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
    });

    return (
        <>
            <Table responsive className="base-table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const columnObj = columnVisibility.find(x => x.id == header.id);
                                return (
                                    <th
                                        key={header.id}
                                        style={{
                                            width: header.getSize(),
                                            textAlign: columnObj?.align ?? "left",
                                        }}
                                    >
                                        <div
                                            data-id={header.id}
                                            draggable
                                            onDragStart={handleDragStart}
                                            onDragOver={e => e.preventDefault()}
                                            onDrop={handleOnDrop}
                                            onDragLeave={handleDragLeave}
                                            onDragEnter={handleDragEnter}
                                            onDragEnd={() => setDragOver("")}
                                            style={{
                                                height: "100%",
                                            }}
                                        >
                                            {(header.column.getCanSort() as boolean) && (
                                                <button
                                                    data-id={header.id}
                                                    onDragEnter={handleDragEnter}
                                                    type="button"
                                                    className={classNames("base-table__sort-action", {
                                                        "base-table__sort-action--active": header.column.getIsSorted(),
                                                    })}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <SortIcon
                                                        data-id={header.id}
                                                        onDragEnter={handleDragEnter}
                                                        className={classNames("base-table__sort-icon", {
                                                            asc: (header.column.getIsSorted() as string) === "asc",
                                                            desc: (header.column.getIsSorted() as string) === "desc",
                                                        })}
                                                    />
                                                </button>
                                            )}

                                            <span
                                                className="base-table__head-text"
                                                data-id={header.id}
                                                onDragEnter={handleDragEnter}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </span>
                                        </div>

                                        <div
                                            {...{
                                                onMouseDown: header.getResizeHandler(),
                                                onTouchStart: header.getResizeHandler(),
                                                className: `base-table__resizer ${
                                                    header.column.getIsResizing() ? "is-resizing" : ""
                                                }`,
                                            }}
                                        />
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody ref={tbodyRef}>
                    {isDataLoading
                        ? table.getRowModel().rows.map(row => (
                              <tr key={row.id}>
                                  <td colSpan={table.getAllColumns().length}>
                                      <Skeleton />
                                  </td>
                              </tr>
                          ))
                        : tableData &&
                          tableData?.length > 0 &&
                          table.getRowModel().rows.map(row => (
                              <tr
                                  key={row.id}
                                  id={row.id}
                                  tabIndex={0}
                                  onKeyDown={e => handleKeyDown(e, row)}
                                  onClick={onRowClick(row.index)}
                                  className={classNames({
                                      active: row.index === activeRowIndex,
                                  })}
                                  style={{
                                      backgroundColor:
                                          row.index !== activeRowIndex && rowDefinitions?.condition(row.original)
                                              ? rowDefinitions?.highlightBackgroundColor
                                              : undefined,
                                  }}
                              >
                                  {row.getVisibleCells().map((cell, index) => (
                                      <td
                                          key={cell.id}
                                          onClick={() => handleRowClick(row.index)}
                                          style={{
                                              borderLeft:
                                                  row.index !== activeRowIndex &&
                                                  index === 0 &&
                                                  rowDefinitions?.condition(row.original)
                                                      ? `3px solid ${rowDefinitions?.highlightBorderColor}`
                                                      : undefined,
                                          }}
                                      >
                                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </td>
                                  ))}
                              </tr>
                          ))}
                </tbody>
            </Table>
            {tableData?.length === 0 && (
                <div className="base-table__fallback">
                    <p className="base-table__fallback-msg">
                        <Trans
                            i18nKey={StringResources.table.fallbackMessage}
                            defaults={t(StringResources.table.fallbackMessage)}
                            values={{
                                fallbackMessageAddon:
                                    Object.keys(queryFilters).length > 0
                                        ? t(StringResources.table.fallbackMessageWithFilter)
                                        : "",
                            }}
                        />
                    </p>
                </div>
            )}

            <div className="base-table__bottom-wrap">
                {isExportShown ? (
                    <BaseButton
                        size="small"
                        styleType="text"
                        text={isMobile ? undefined : t(StringResources.table.export)}
                        handleClick={onExportBtnClick}
                    />
                ) : (
                    <div></div>
                )}
                {totalCount != null && (
                    <CustomPagination
                        totalCount={totalCount ?? 0}
                        currentPage={table.getState().pagination.pageIndex}
                        setActivePage={setActivePageIndex}
                        setPageSize={setPageSize}
                        pageSize={pageSize}
                    />
                )}
            </div>
        </>
    );
});

export default BaseTable;

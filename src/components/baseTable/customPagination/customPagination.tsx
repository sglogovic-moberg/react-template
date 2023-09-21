import arrowLeft from "assets/images/arrow-left.svg";
import arrowRight from "assets/images/arrow-right.svg";
import doubleArrowLeft from "assets/images/double-arrow-left.svg";
import doubleArrowRight from "assets/images/double-arrow-right.svg";
import BaseDropdown from "components/baseDropdown/baseDropdown";
import { Dropdown, Pagination } from "react-bootstrap";
import "./customPagination.scss";
import { StringResources } from "utils/language/languageResource";
import { useTranslation } from "react-i18next";
import { mobileScreenResolution } from "utils/constants";
import { useMediaQuery } from "utils/customHooks";

interface ICustomPaginationProps {
    totalCount: number;
    setActivePage: (page: number) => void;
    setPageSize: (rowsPerPage: number) => void;
    currentPage: number;
    pageSize: number;
}

function CustomPagination(props: ICustomPaginationProps) {
    const { totalCount, setActivePage, currentPage, pageSize } = props;
    const pageNumber = Math.ceil(totalCount / pageSize);
    const isElipsisRequired = pageNumber > 5;
    const { t } = useTranslation();
    const isMobile = useMediaQuery(mobileScreenResolution);

    const onPageClick = (currentPage: number) => {
        return (event: any) => {
            if (currentPage >= 0 && currentPage <= pageNumber) {
                setActivePage(currentPage);
            }
        };
    };

    const getElipsedPagination = () => {
        const items = [];
        let startNumber = currentPage - 2 <= 0 ? 0 : currentPage - 2;
        const endNumber = startNumber + 5 > pageNumber ? pageNumber : startNumber + 5;
        startNumber = endNumber - 5;
        for (let index = startNumber; index < endNumber; index++) {
            items.push(
                <Pagination.Item key={index} active={currentPage == index} onClick={onPageClick(index)}>
                    {index + 1}
                </Pagination.Item>
            );
        }

        return items;
    };

    const setPageSize = (eventKey: string) => {
        props.setPageSize(Number(eventKey));
    };

    const toPageSizeCount = (currentPage + 1) * pageSize > totalCount ? totalCount : (currentPage + 1) * pageSize;

    return (
        <div className="custom-pagination__wrapper">
            {!isMobile && `${t(StringResources.table.itemsPerPage)}`}
            <BaseDropdown onSelect={setPageSize} toggleText={props.pageSize.toString()}>
                {[25, 50, 100, 200].map(key => {
                    return (
                        <Dropdown.Item key={key} eventKey={key}>
                            {key}
                        </Dropdown.Item>
                    );
                })}
            </BaseDropdown>
            {!isMobile && (
                <div>
                    {currentPage * pageSize + (totalCount > 0 ? 1 : 0)} - {toPageSizeCount} of{" "}
                    <span style={{ fontWeight: 500 }}>{totalCount} </span>
                </div>
            )}
            {totalCount > pageSize && (
                <Pagination className="custom-pagination">
                    <Pagination.First onClick={onPageClick(0)} disabled={currentPage == 0}>
                        <img width="14" height="14" src={doubleArrowLeft} />
                    </Pagination.First>
                    <Pagination.Prev onClick={onPageClick(currentPage - 1)} disabled={currentPage == 0}>
                        <img width="8" height="13" src={arrowLeft} />
                    </Pagination.Prev>
                    {isElipsisRequired ? (
                        <>{getElipsedPagination()}</>
                    ) : (
                        <>
                            {[...Array(pageNumber)].map((x, i) => {
                                return (
                                    <Pagination.Item key={i} active={currentPage == i} onClick={onPageClick(i)}>
                                        {i + 1}
                                    </Pagination.Item>
                                );
                            })}
                        </>
                    )}
                    <Pagination.Next
                        onClick={onPageClick(currentPage + 1)}
                        disabled={pageNumber == 0 || currentPage == pageNumber - 1}
                    >
                        <img width="8" height="13" src={arrowRight} />
                    </Pagination.Next>
                    <Pagination.Last onClick={onPageClick(pageNumber - 1)} disabled={currentPage == pageNumber - 1}>
                        <img width="14" height="14" src={doubleArrowRight} />
                    </Pagination.Last>
                </Pagination>
            )}
        </div>
    );
}

export default CustomPagination;

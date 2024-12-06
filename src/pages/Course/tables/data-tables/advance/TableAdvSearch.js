import { Fragment, useState, useEffect, memo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import ComponentSpinner from "../../../../../@core/components/spinner/Loading-spinner";
import { Card, Input, Label, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TableAdvSearch = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5); // مقدار پیش‌فرض 
    const [searchValue, setSearchValue] = useState("");
    const [searchField, setSearchField] = useState("title");
    const [filteredData, setFilteredData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setIsSearching(true);

        const timer = setTimeout(() => {
            const newFilteredData =
                data?.filter((item) => {
                    if (searchField === "isActive") {
                        const isActiveSearchValue =
                            searchValue.toLowerCase() === "فعال"
                                ? true
                                : searchValue.toLowerCase() === "غیرفعال"
                                    ? false
                                    : null;

                        if (isActiveSearchValue === null) return true;
                        return item.isActive === isActiveSearchValue;
                    } else if (searchField === "isdelete") {
                        const isDeleteSearchValue =
                            searchValue.toLowerCase() === "موجود"
                                ? false
                                : searchValue.toLowerCase() === "حذف شده"
                                    ? true
                                    : null;

                        if (isDeleteSearchValue === null) return true;
                        return item.isdelete === isDeleteSearchValue;
                    }

                    return item[searchField]
                        ?.toString()
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                }) || [];

            setFilteredData(newFilteredData); // به‌روزرسانی داده‌ها
            setIsSearching(false);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchValue, searchField, data]);

    const handleFilter = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const handlePerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value)); 
        setCurrentPage(1); 
    };

    const dataToRender = () => {
        return filteredData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        );
    };

    const naviget = useNavigate()
    const [selectCourseid , setselectCourseid] = useState(null)

    const handleRowClick = (courseId) => {
        setselectCourseid(courseId);
        naviget (`/CoursePreview/${courseId}`);

        console.log(courseId)
    };

    const CustomPagination = () => {
        const count = Math.ceil(filteredData.length / rowsPerPage);
        return (
            <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                breakLabel="..."
                pageCount={count || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                activeClassName="active"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePagination(page)}
                pageClassName="page-item"
                breakClassName="page-item"
                nextLinkClassName="page-link"
                pageLinkClassName="page-link"
                breakLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextClassName="page-item next-item"
                previousClassName="page-item prev-item"
                containerClassName={
                    "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
                }
            />
        );
    };

    return (
        <Fragment>
            <Card>
                <Row className="mx-0 mt-1 mb-50">
                    <Col sm="4" className="d-flex align-items-center">
                        <Label for="sort-select">مرتب سازی</Label>
                        <Input
                            className="dataTable-select"
                            type="select"
                            id="sort-select"
                            value={rowsPerPage}
                            onChange={handlePerPage}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Input>
                    </Col>

                    <Col sm="4" className="d-flex align-items-center">
                        <Label for="field-select">جستجو بر اساس</Label>
                        <Input
                            type="select"
                            id="field-select"
                            value={searchField}
                            onChange={handleFieldChange}
                        >
                            <option value="title">عنوان دوره</option>
                            <option value="typeName">نوع دوره</option>
                            <option value="levelName">سطح دوره</option>
                            <option value="isActive">وضعیت دوره</option>
                            <option value="isdelete">وضعیت موجود بودن</option>
                        </Input>
                    </Col>

                    <Col
                        sm="4"
                        className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                    >
                        <Label for="search-input">جستجو</Label>
                        <Input
                            className="dataTable-filter w-auto"
                            type="text"
                            bsSize="sm"
                            id="search-input"
                            value={searchValue}
                            onChange={handleFilter}
                        />
                    </Col>
                </Row>

                <div className="react-dataTable">
                    <DataTable
                        noHeader
                        pagination
                        paginationServer
                        className="react-dataTable"
                        columns={[
                            {
                                name: "عنوان دوره",
                                selector: (row) => row.title,
                                sortable: true,
                            },
                            {
                                name: "نوع دوره",
                                selector: (row) => row.typeName,
                                sortable: true,
                            },
                            {
                                name: "سطح دوره",
                                selector: (row) => row.levelName,
                                sortable: true,
                            },
                            {
                                name: "وضعیت فعال بودن",
                                selector: (row) => {
                                    const status = row.isActive ? "فعال" : "غیرفعال";
                                    const statusColor = row.isActive ? "green" : "red";
                                    return <span style={{ color: statusColor }}>{status}</span>;
                                },
                                sortable: true,
                            },
                            {
                                name: "وضعیت موجود بودن",
                                selector: (row) => {
                                    const status = row.isdelete ? "حذف شده" : "موجود";
                                    const statusColor = row.isdelete ? "red" : "blue";
                                    return <span style={{ color: statusColor }}>{status}</span>;
                                },
                                sortable: true,
                            },
                        ]}
                        sortIcon={<ChevronDown size={10} />}
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                        noDataComponent={
                            <p>
                                {isLoading ? (
                                    <ComponentSpinner />
                                ) : (
                                    <span>داده‌ای برای نمایش وجود ندارد.</span>
                                )}
                            </p>
                        }
                        onRowClicked={(row) => handleRowClick(row.courseId)} // کلیک بر روی هر سطر
                    />
                </div>
            </Card>
        </Fragment>
    );
};

export default memo(TableAdvSearch);
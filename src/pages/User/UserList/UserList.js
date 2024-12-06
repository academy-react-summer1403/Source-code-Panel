import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Button, Input, Row, Col, Card, CardHeader, CardText } from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getCourseListApi } from "../../../core/services/api/user/UserList";
import { Coursecolumns } from "../../../@core/components/UserList/UserList";

// Custom header for filtering and pagination
const CustomHeader = ({ handleFilter, handlePerPage }) => (
    <div className="invoice-list-table-header w-100 py-2">
        <Row>
            <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
                <div className="d-flex align-items-center me-2">
                    <label htmlFor="rows-per-page">نمایش</label>
                    <Input
                        type="select"
                        id="rows-per-page"
                        onChange={handlePerPage}
                        className="form-control ms-50 pe-3"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </Input>
                </div>
                <Button tag={Link} to="/CourseAdd" color="primary">
                    افزودن دوره
                </Button>
            </Col>
            <Col
                lg="6"
                className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
            >
                <div className="d-flex align-items-center">
                    <Input
                        id="search-invoice"
                        className="ms-50 me-2 w-200"
                        type="text"
                        onChange={(e) => handleFilter(e.target.value)}
                        placeholder="جستجوی دوره ها"
                    />
                </div>
            </Col>
        </Row>
    </div>
);

const UserPage = () => {
    const [user, setUser] = useState({ userFilterDtos: [], totalCount: 0 });
    const [sort, setSort] = useState("desc");
    const [sortColumn, setSortColumn] = useState("id");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const getUser = await getCourseListApi(
                    currentPage,
                    rowsPerPage,
                    sortColumn,
                    sort,
                    searchText
                );
                setUser(getUser); // داده‌ها را در state ذخیره کنید
            } catch (error) {
                console.log("ارور", error);
            }
        };
        fetchUser();
    }, [currentPage, rowsPerPage, sortColumn, sort, searchText]);

    const handleFilter = (val) => {
        setSearchText(val);
    };

    const handlePerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value));
    };

    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const CustomPagination = () => {
        const count = Math.ceil(user?.totalCount / rowsPerPage);
        return (
            <ReactPaginate
                nextLabel=""
                breakLabel="..."
                previousLabel=""
                pageCount={count || 1}
                activeClassName="active"
                pageClassName="page-item"
                breakClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item next"
                previousClassName="page-item prev"
                onPageChange={handlePagination}
                forcePage={currentPage - 1}
                containerClassName="pagination react-paginate justify-content-end p-1"
            />
        );
    };


    const handleSort = (column, sortDirection) => {
        setSort(sortDirection);
        setSortColumn(column.sortField);
    };

    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/UserPreview/${id}`);
    };

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardText> لیست دوره ها </CardText>
                </CardHeader>
            </Card>
            <div className="invoice-list-wrapper">
                <Card>
                    <div className="invoice-list-dataTable react-dataTable">
                        <DataTable
                            noHeader
                            pagination
                            sortServer
                            paginationServer
                            subHeader={true}
                            columns={Coursecolumns}
                            responsive={true}
                            onSort={handleSort}
                            data={user}
                            sortIcon={<ChevronDown />}
                            className="react-dataTable"
                            paginationDefaultPage={currentPage}
                            paginationComponent={CustomPagination}
                            subHeaderComponent={<CustomHeader handleFilter={handleFilter} handlePerPage={handlePerPage} />}
                            onRowClicked={(row) => handleRowClick(row.id)}
                        />
                    </div>
                </Card>
            </div>
        </Fragment>
    );
};

export default UserPage;

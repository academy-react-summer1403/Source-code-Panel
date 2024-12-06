import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import { Check, Trash2 } from 'react-feather'
// ** Reactstrap Imports
import {
    Table,
    Card,
    CardBody,
    Col,
    Row,
    Button
} from "reactstrap";
import { dateModified } from "../Course/CoursePreview/datemod";
import { getReserv } from "../../core/services/api/reserv/reserva";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function Reserv() {
    const [Reserv, setReserv] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const getReserva = async () => {
        const result = await getReserv();
        setReserv(result);
    };

    useEffect(() => {
        getReserva();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Reserv?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(Reserv?.length / itemsPerPage);

    // تغییر صفحه
    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const CustomPagination = () => {
        const count = totalPages;

        return (
            <ReactPaginate
                nextLabel="›"
                breakLabel="..."
                previousLabel="‹"
                pageCount={count || 1}
                activeClassName="active"
                breakClassName="page-item"
                pageClassName="page-item"
                breakLinkClassName="page-link"
                nextLinkClassName="page-link"
                pageLinkClassName="page-link"
                nextClassName="page-item next"
                previousLinkClassName="page-link"
                previousClassName="page-item prev"
                onPageChange={handlePagination}
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                containerClassName="pagination react-paginate justify-content-end p-1"
            />
        );
    };

    const navigate = useNavigate();

    const handleClick = (courseId) => {

        navigate(`/CoursePreview/${courseId}`);
    };

    return (
        <div>
            <Col className=".bg-light-subtle">
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="3 ">
                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    className="form-select">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </Col>
                        </Row>

                        <Table className="text-nowrap text-center border-bottom" responsive>
                            <thead>
                                <tr>
                                    <th className="text-start">اسم دوره</th>
                                    <th>رزرو کننده</th>
                                    <th>تاریخ رزرو</th>
                                    <th>وضعیت رزرو</th>
                                    <th>پذیرش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.map((item, index) => {
                                    const rowClass = item.accept ? "bg-success text-white" : "bg-danger text-white";
                                    return (
                                        <tr key={index}>
                                            <td onRowClicked={(row) => handleClick(row.courseId)}>{item.courseName}</td>
                                            <td>{item.studentName}</td>
                                            <td className="text-start">{dateModified(item.reserverDate)}</td>
                                            <td className={rowClass}>
                                                {item.accept ? "تایید شده" : "تایید نشده"}
                                            </td>
                                            <td>
                                                <div className="d-flex flex-row gap-1 justify-content-center">
                                                    <Button.Ripple color="success">
                                                        <Check size={14} />
                                                    </Button.Ripple>
                                                    <Button.Ripple color="danger">
                                                        <Trash2 size={12} />
                                                    </Button.Ripple>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <div className=" "><CustomPagination /></div>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}

export default Reserv;

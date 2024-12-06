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
import { getAllCoursesComent } from "../../core/services/api/Coment/coment";
import ReactPaginate from "react-paginate";

function Comment() {
    const [Comment, setComment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const getCoursesComenta = async () => {
        setIsLoading(true);  // هنگام درخواست به API وضعیت بارگذاری فعال می‌شود
        try {
            const result = await getAllCoursesComent();
            console.log("داده‌های دریافت شده از API:", result);
            if (Array.isArray(result)) {
                setComment(result);
            } else {
                console.error("داده‌ها به درستی دریافت نشدند:", result);
            }
        } catch (error) {
            console.error("خطا در دریافت کامنت‌ها:", error);
        } finally {
            setIsLoading(false);  // پس از اتمام درخواست، وضعیت بارگذاری غیرفعال می‌شود
        }
    };




    useEffect(() => {
        getCoursesComenta();  // فراخوانی تابع برای دریافت کامنت‌ها
    }, []);

    // صفحه‌بندی
    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);  // بروزرسانی صفحه فعلی هنگام تغییر صفحه
    };

    // محاسبه مقادیر شروع و پایان هر صفحه
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComments = Comment.slice(indexOfFirstItem, indexOfLastItem);  // استخراج کامنت‌های مربوط به صفحه فعلی

    return (
        <div>
            <Col className=".bg-light-subtle">
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="3">
                                <select
                                    value={itemsPerPage}
                                    className="form-select"
                                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}  // تغییر تعداد آیتم‌ها در هر صفحه
                                >
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
                                    <th>نام کاربر</th>
                                    <th>عنوان کامنت</th>
                                    <th>متن کامنت</th>
                                    <th>تاربخ کامنت</th>
                                    <th>وضعیت رزرو</th>
                                    <th>پذیرش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentComments?.length > 0 ? (
                                    currentComments.map((item, index) => {
                                        const rowClass = item.accept ? "bg-success text-white" : "bg-danger text-white";
                                        return (
                                            <tr key={index}>
                                                <td>{item.courseTitle}</td>
                                                <td>{item.userFullName}</td>
                                                <td>{item.commentTitle}</td>
                                                <td>{item.describe}</td>
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
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7">هیچ کامنتی برای نمایش وجود ندارد</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

                {/* صفحه‌بندی */}
                <ReactPaginate
                    previousLabel={"قبلی"}
                    nextLabel={"بعدی"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(Comment.length / itemsPerPage)}  // تعداد صفحات بر اساس تعداد کامنت‌ها و آیتم‌ها در هر صفحه
                    onPageChange={handlePageClick}  // تغییر صفحه
                    containerClassName={"pagination justify-content-center"}
                    activeClassName={"active"}
                />
            </Col>
        </div>
    );
}

export default Comment;

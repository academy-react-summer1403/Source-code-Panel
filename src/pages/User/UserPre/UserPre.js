import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import { Check, X } from 'react-feather'
// ** Reactstrap Imports
import {
    Nav,
    TabPane,
    NavItem,
    NavLink,
    Dropdown,
    TabContent,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Table,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardColumns,
    CardText,
    Col,
    Row,
    CardImg,
    Button,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
// import { useUserDetail } from "../../../core/services/api/user/UserPre";
import { dateModified } from "../../Course/CoursePreview/datemod";
import { useUserDetail } from "../../../core/services/api/user/UserPre";
// import { getCoursesComent } from "../../../core/services/api/Coment/comentid";

const UserDetail = () => {
    // ** States

    const [data, setData] = useState([]);
    // const [CorseReserv, setCorseReserv] = useState([]);
    // const [CorseComent, setCorseComent] = useState([]);
    const params = useParams();
    const getUserid = async () => {
        const result = await useUserDetail(params.id);
        setData(result);
    }
    useEffect(() => {
        getUserid();
    }, []);

    // const GetCourseReserv = async () => {
    //     const result = await useUserDetail(params.id);
    //     // console.log(result)
    //     setCorseReserv(result);
    // }
    // useEffect(() => {
    //     GetCourseReserv();
    // }, []);

    // const GetCourseComent = async () => {
    //     const result = await getCoursesComent(params.id);
    //     // console.log(result)
    //     setCorseComent(result);
    // }
    // useEffect(() => {
    //     GetCourseComent();
    // }, []);

    const [active, setActive] = useState("1");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const toggle = (tab) => {
        setActive(tab);
    };
    return (
        <>
            <Row>
                <Col lg="4">
                    <Card>
                        <CardImg src={data.imageAddress} ></CardImg>
                        <CardBody>
                            <CardTitle tag="h4" className="border-bottom">
                                جزيیات کاربر
                            </CardTitle>
                            <CardColumns>
                                <CardText className="d-flex flex-row gap-2">
                                    <h3 className="mt-2 ">نام و نام خانوادگی:</h3>{" "}
                                    <h4 className="mt-2">{data.fName}</h4>
                                    <h4 className="mt-2">{data.lName}</h4>
                                </CardText>
                                <CardText className="d-flex flex-row gap-2">
                                    <h3 className="mt-2 ">نام کاربری:</h3>{" "}
                                    <h5 className="mt-2">{data.userName}</h5>
                                </CardText>
                                <CardText className="d-flex flex-row gap-2">
                                    <h3 className="mt-2 ">شماره:</h3>{" "}
                                    <h5 className="mt-2">{data.phoneNumber}</h5>
                                </CardText>
                                <CardText className="d-flex flex-row gap-2">
                                    <h3 className="mt-2 ">وضعیت:</h3>{" "}
                                    <h5 className="mt-2">{data.active ? "فعال" : "غیر فعال"}</h5>
                                </CardText>
                            </CardColumns>
                            <div className="demo-inline-spacing">
                                {/* <Button onClick={gotoedit} color="relief-primary"> ویرایش</Button> */}
                                <Button outline color="warning">
                                    غیرفعال کردن دوره
                                </Button>
                                <Button outline color="danger">
                                    حذف دوره
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg="8" className=".bg-light-subtle">
                    <Nav pills>
                        <NavItem>
                            <NavLink
                                active={active === "1"}
                                onClick={() => {
                                    toggle("1");
                                }}
                            >
                                مشخصات
                            </NavLink>
                        </NavItem>
                        {/* <NavItem>
                            <NavLink
                                active={active === "2"}
                                onClick={() => {
                                    toggle("2");
                                }}
                            >
                                دوره های کاربر
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === "3"}
                                onClick={() => {
                                    toggle("3");
                                }}
                            >
                                دوره های رزرو شده کاربر
                            </NavLink>
                        </NavItem> */}
                    </Nav>
                    <Card>
                        <TabContent className="py-50" activeTab={active}>
                            <TabPane tabId="1">
                                <div>
                                    <Card>
                                        <CardHeader className="text-center text-lg">
                                            <h2>توضیحات</h2>
                                        </CardHeader>
                                        <CardBody>
                                            {data.userAbout}
                                            <CardColumns>
                                                <CardText className="d-flex flex-row gap-2">
                                                    <h3 className="mt-2 ">ایمیل:</h3>{" "}
                                                    <h4 className="mt-2">{data.recoveryEmail}</h4>
                                                </CardText>
                                                <CardText className="d-flex flex-row gap-2">
                                                    <h3 className="mt-2 ">آدرس:</h3>{" "}
                                                    <h4 className="mt-2">{data.homeAdderess}</h4>
                                                </CardText>
                                                <CardText className="">
                                                    <div className="d-flex flex-row gap-2">
                                                        <h3 className="mt-2 ">تاریخ تولپ :</h3>{" "}
                                                        <h4 className="mt-2">{dateModified(data.birthDay)}</h4>
                                                    </div>
                                                    <div className="d-flex flex-row gap-2">
                                                        <h3 className="mt-2 ">تاریخ ثبت نام :</h3>{" "}
                                                        <h4 className="mt-2">{dateModified(data.insertDate)}</h4>
                                                    </div>
                                                </CardText>
                                            </CardColumns>
                                            <div className="demo-inline-spacing">
                                                <Button outline color="danger">
                                                    حذف
                                                </Button>
                                            </div>
                                            <Button className="m-1" color="relief-primary">
                                                اضافه کردن گروه
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </TabPane>
                            {/* <TabPane tabId="2">
                                <h1 className="m-2">کاربرانی که این دوره را رزرو کرده اند</h1>
                                <Table className='text-nowrap text-center border-bottom' responsive>
                                    <thead>
                                        <tr>
                                            <th className='text-start'>رزرو کننده</th>
                                            <th>تاریخ رزرو</th>
                                            <th>وضعیت رزرو</th>
                                            <th>پذیرش</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses?.map((item, index) => {
                                            // const rowClass = item.accept ? "bg-success text-white" : "bg-danger text-white";
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {item.title}
                                                    </td>
                                                    <td className='text-start'> {dateModified(item.lastUpdate)}</td>
                                                    <td className={rowClass}>
                                                        {item.describe}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-row gap-1 justify-content-center">
                                                            <Button.Ripple color='success'>
                                                                <Check size={14} />
                                                            </Button.Ripple>
                                                            <Button.Ripple color='danger'>
                                                                <X size={12} />
                                                            </Button.Ripple>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </Table>
                            </TabPane> */}
                        </TabContent>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default UserDetail;
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledTooltip,
    UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import {
    Eye,
    Send,
    Edit,
    Copy,
    Save,
    Info,
    Trash,
    PieChart,
    Download,
    TrendingUp,
    CheckCircle,
    MoreVertical,
    ArrowDownCircle,
} from "react-feather";
import { dateModified } from "../../../pages/Course/CoursePreview/datemod";
// import { DtaeConvert } from "../../../core/services/utils/date";
// import { numb } from "../../../core/services/utils/numb";

// ** Vars
const invoiceStatusObj = {
    Sent: { color: "light-secondary", icon: Send },
    Paid: { color: "light-success", icon: CheckCircle },
    Draft: { color: "light-primary", icon: Save },
    Downloaded: { color: "light-info", icon: ArrowDownCircle },
    "Past Due": { color: "light-danger", icon: Info },
    "Partial Payment": { color: "light-warning", icon: PieChart },
};

export const Coursecolumns = [
    {
        name: "نام و نام خانوادگی",
        sortable: true,
        minWidth: "300px",
        sortField: "fname",
        cell: (row) => (
            <div>
                <span className="text-sm text-primary">{row?.fname}</span>
                <span className="text-sm text-primary">{row?.lname}</span>
            </div>
        ),
    },
    {
        sortable: true,
        name: "تاریخ ثبت نام",
        minWidth: "164px",
        sortField: "insertDate",
        cell: (row) => <h4>{dateModified(row.insertDate)}</h4>,
    },
    {
        name: "شماره",
        minWidth: "70px",
        cell: (row) => <span>{row?.phoneNumber}</span>,
    },
    {
        sortable: true,
        name: "وضعیت",
        minWidth: "150px",
        sortField: "active",
        cell: (row) => <span>{row.active}</span>,
    },
];

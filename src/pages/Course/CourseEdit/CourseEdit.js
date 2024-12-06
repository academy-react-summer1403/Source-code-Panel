import { Fragment, useRef, useEffect, useState } from "react";

import { getCoursesPre } from "../../../core/services/api/Course/CoursePreview/CoursePreview";

// ** Third Party Components
import classnames from "classnames";
import { Check } from "react-feather";
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
import { useParams } from "react-router-dom";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Image from "./validation/Image";

import PersonalInfo from "./validation/PersonalInfo";
import AccountDetails from "./validation/AccountDetails";
const EditCourse = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  console.log(id);
  const getDetails = async () => {
    if (token) {
      const result = await getCoursesPre(id);
      console.log("course detail", result);
      setData(result);
    } else {
      console.log("توکن وجود ندارد");
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات اولیه",
      subtitle: "اطلاعات اولیه را وارد کنید",
      content: <AccountDetails stepper={stepper} getData={data} />,
    },
    {
      id: "personal-info",
      title: "ویژگی دوره",
      subtitle: "ویژگی دوره را وارد کنید",
      content: <PersonalInfo stepper={stepper} />,
    },
    {
      id: "step-image",
      title: "عکس دوره",
      subtitle: "عکس دوره را وارد کنیپ",
      content: <Image stepper={stepper} />,
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default EditCourse;
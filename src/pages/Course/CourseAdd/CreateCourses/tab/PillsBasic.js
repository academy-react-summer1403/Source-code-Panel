// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import classnames from "classnames";

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
    Col,
    Row,
} from "reactstrap";
import FirstForms from "../forms/level1/Form1";
import SecondForms from "../forms/level1/Form2";
import ThirdForms from "../forms/level1/Form3";
import FourthForms from "../forms/level1/Form4";

const PillBasic = ({ courseItems, setFirstLv, setSecondLv, setThirdLv, setForthLv }) => {
    // ** States
    const [active, setActive] = useState("1");
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const toggle = (tab) => {
        setActive(tab);
    };
    return (
        <Fragment>
            <Nav pills>
                <NavItem>
                    <NavLink
                        active={active === "1"}
                        onClick={() => {
                            toggle("1");
                        }}
                    >
                        مرحله1
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === "2"}
                        onClick={() => {
                            toggle("2");
                        }}
                    >
                        مرحله2
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === "3"}
                        onClick={() => {
                            toggle("3");
                        }}
                    >
                        مرحله3
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === "4"}
                        onClick={() => {
                            toggle("4");
                        }}
                    >
                        مرحله4
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={active}>
                <TabPane tabId="1">
                    <div class=" w-75 mx-auto" style={{ height: "300px" }}>
                        <FirstForms setFirstLv={setFirstLv} />
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div class=" w-75 mx-auto " style={{ height: "300px" }}>
                        <SecondForms courseItems={courseItems} setSecondLv={setSecondLv} />
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div class=" w-75 mx-auto" style={{ height: "300px" }}>
                        <ThirdForms setThirdLv={setThirdLv} />
                    </div>
                </TabPane>
                <TabPane tabId="4">
                    <div class=" w-75 mx-auto" style={{ height: "300px" }}>
                        <FourthForms setForthLv={setForthLv} />
                    </div>
                </TabPane>
            </TabContent>
        </Fragment>
    );
};
export default PillBasic;
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";
import { useContext } from "react";
import CardCongratulations from "../@core/components/Dashboard/CardCon";
import StatsVertical from "../@core/components/Dashboard/StatsV";
import { User, FileText, File } from "react-feather";
import SupportTracker from "../@core/components/Dashboard/Support";
import SupportTracker2 from "../@core/components/Dashboard/Support2";
import { ThemeColors } from "@src/utility/context/ThemeColors";

const Home = () => {
  const { colors } = useContext(ThemeColors);
  return (
    <div>
      <Row>
        <Col lg="6" sm="12">
          <CardCongratulations />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<User />}
            stats={26}
            statTitle={"تعداد تمام کاربرها"}
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<File />}
            stats={1}
            statTitle={"تعداد تمام دوره های رزرو شده"}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6" xs="12">
          <SupportTracker
            primary={colors.primary.main}
            danger={colors.danger.main}
          />
        </Col>
        <Col lg="6" xs="12">
          <SupportTracker2
            primary={colors.primary.main}
            danger={colors.danger.main}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
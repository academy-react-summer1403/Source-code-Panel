// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../core/services/api/Auth/auth";
import toast, { Toaster } from "react-hot-toast";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

// ** Formik Imports
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const { skin } = useSkin();
  const navigate = useNavigate();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const loginUser = async (values) => {
    const userObj = {
      phoneOrGmail: values.loginEmail,
      password: values.loginPassword,
      rememberMe: true,
    };
    const user = await loginAPI(userObj);
    console.log("اطلاعات لاگین", user);
    if (user && user.token) {
      if (user.message.includes("موفق")) {
        localStorage.setItem("token", user.token);
        console.log("توکن شما", user.token);
        navigate("/home");
      }
    } else {
      console.log("توکن موجود نیست");
      toast.error("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  const validationSchema = Yup.object({
    loginEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    loginPassword: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  return (
    <div className="auth-wrapper auth-cover text-end">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            ></g>
          </svg>
          {/* <h2 className="brand-text text-primary ms-1">Vuexy</h2> */}
        </Link>

        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              به پنل ادمین Virtual Sprite خوش آمدید
            </CardTitle>
            <CardText className="mb-2 yekanR">
              لطفاً اطلاعات مورد نیاز را پر کنید
            </CardText>
            <Formik
              initialValues={{}}
              validationSchema={validationSchema}
              onSubmit={loginUser}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      پست الکترونیکی
                    </Label>
                    <Input
                      type="email"
                      id="login-email"
                      name="loginEmail"
                      placeholder="virtual-sprite@google.com"
                      value={values.loginEmail}
                      onChange={handleChange}
                      invalid={touched.loginEmail && !!errors.loginEmail}
                    />
                    <FormFeedback>{errors.loginEmail}</FormFeedback>
                  </div>
                  <div className="mb-1">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="login-password">
                        رمز عبور
                      </Label>
                      <Link to="/forgot-password">
                        <small>فراموشی رمز</small>
                      </Link>
                    </div>
                    <InputPasswordToggle
                      id="login-password"
                      name="loginPassword"
                      value={values.loginPassword}
                      onChange={handleChange}
                      invalid={touched.loginPassword && !!errors.loginPassword}
                    />
                    <FormFeedback>{errors.loginPassword}</FormFeedback>
                  </div>
                  <div className="form-check mb-1">
                    <Input
                      type="checkbox"
                      id="remember-me"
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={handleChange}
                    />
                    <Label className="form-check-label" for="remember-me">
                      مرا به خاطر بسپار
                    </Label>
                  </div>
                  <Button type="submit" color="primary" block>
                    ورود
                  </Button>
                </Form>
              )}
            </Formik>
            <p className="text-center mt-2">
              <span className="me-25">آیا حسابی ندارید؟</span>
              <Link to="/register">
                <span>ساخت حساب کاربری</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">یا</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
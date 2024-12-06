import { Fragment, useState, useEffect } from 'react';
import { getaddCardApi } from '../../../core/services/api/user/AddUser';
import React from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Row,
  Col,
  Card,
  Label,
  Button,
  CardBody,
} from 'reactstrap';
import 'react-slidedown/lib/slidedown.css';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/base/pages/app-invoice.scss';

import toast from 'react-hot-toast';
// import 'react-hot-toast/dist/index.css';
import { Toaster } from 'react-hot-toast';


const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('نام ضروری است'),
  lastName: Yup.string().required('نام خانوادگی ضروری است'),
  password: Yup.string()
    .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد')
    .required('رمز عبور ضروری است'),
  gmail: Yup.string()
    .email('ایمیل معتبر وارد کنید')
    .required('ایمیل ضروری است'),
  phoneNumber: Yup.string()
    .matches(/^09[0-9]{9}$/, 'شماره موبایل باید با 09 شروع شود و 11 رقم باشد')
    .required('شماره موبایل ضروری است'),
});

const AddUser = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form Values:', values);
    setSubmitting(true);
    getaddCardApi(
      values.firstName,
      values.lastName,
      values.password,
      values.gmail,
      values.phoneNumber,
      values.isTeacher,
      values.isStudent,
      values.command,

    )
      .then((response) => {
        console.log("API Response:", response);
        toast.success('اطلاعات با موفقیت ثبت شد!');
      })
      .catch((error) => {
        console.error("API Error:", error);
      toast.error('ثبت اطلاعات با خطا مواجه شد.');
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        password: '',
        gmail: '',
        phoneNumber: '',
        isTeacher: false,
        isStudent: false,
        command: "awswqa"
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
      <Toaster position="top-center" reverseOrder={false} />

          <Card className="invoice-preview-card">
            <CardBody className="invoice-padding pb-0">
              <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                <div>
                  <div className="logo-wrapper">
                    <svg viewBox="0 0 139 95" version="1.1" height="24">
                      <defs>
                        <linearGradient
                          id="invoice-linearGradient-1"
                          x1="100%"
                          y1="10.5120544%"
                          x2="50%"
                          y2="89.4879456%"
                        >
                          <stop stopColor="#000000" offset="0%"></stop>
                          <stop stopColor="#FFFFFF" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient
                          id="invoice-linearGradient-2"
                          x1="64.0437835%"
                          y1="46.3276743%"
                          x2="37.373316%"
                          y2="100%"
                        >
                          <stop
                            stopColor="#EEEEEE"
                            stopOpacity="0"
                            offset="0%"
                          ></stop>
                          <stop stopColor="#FFFFFF" offset="100%"></stop>
                        </linearGradient>
                      </defs>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g transform="translate(-400.000000, -178.000000)">
                          <g transform="translate(400.000000, 178.000000)">
                            <path
                              className="text-primary"
                              d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                              style={{ fill: 'currentColor' }}
                            ></path>
                            <path
                              d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                              fill="url(#invoice-linearGradient-1)"
                              opacity="0.2"
                            ></path>
                            <polygon
                              fill="#000000"
                              opacity="0.049999997"
                              points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                            ></polygon>
                            <polygon
                              fill="#000000"
                              opacity="0.099999994"
                              points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                            ></polygon>
                            <polygon
                              fill="url(#invoice-linearGradient-2)"
                              opacity="0.099999994"
                              points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                            ></polygon>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <h3 className="text-primary invoice-logo">Vuexy</h3>
                  </div>
                </div>
                <div className="invoice-number-date mt-md-0 mt-2">
                  <div className="d-flex align-items-center justify-content-md-end mb-1"></div>
                </div>
              </div>
            </CardBody>

            <hr className="invoice-spacing" />
            <CardBody className="invoice-padding">
              <Row className="invoice-sales-total-wrapper">
                <Col className="mt-md-0 mt-3" md="6" xs="12">
                  <div className="d-flex align-items-center mb-1 ">
                    <Label for="firstName" className="form-label me-2">
                      نام:
                    </Label>
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control"
                      // placeholder="Edward"
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-danger">{errors.firstName}</div>
                    )}
                  </div>
                </Col>
                <Col className="mt-md-0 mt-3" md="6" xs="12">
                  <div className="d-flex align-items-center mb-1">
                    <Label for="lastName" className="form-label me-2">
                      نام خانوادگی:
                    </Label>
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control"
                      // placeholder="Crowley"
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="text-danger">{errors.lastName}</div>
                    )}
                  </div>
                </Col>
                <Col className="mt-md-0 mt-3" md="6" xs="12">
                  <div className="d-flex align-items-center mb-1">
                    <Label for="phoneNumber" className="form-label me-2">
                      شماره موبایل:
                    </Label>
                    <Field
                      type="number"
                      name="phoneNumber"
                      className="form-control"
                      // placeholder="09123456789"
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    )}
                  </div>
                </Col>
                <Col className="mt-md-0 mt-3" md="6" xs="12">
                  <div className="d-flex align-items-center mb-1">
                    <Label for="gmail" className="form-label me-2">
                      ایمیل:
                    </Label>
                    <Field
                      type="email"
                      name="gmail"
                      className="form-control"
                      // placeholder="example@gmail.com"
                    />
                    {errors.gmail && touched.gmail && (
                      <div className="text-danger">{errors.gmail}</div>
                    )}
                  </div>
                </Col>
                <Col className="mt-md-0 mt-3" md="6" xs="12">
                  <div className="d-flex align-items-center mb-1">
                    <Label for="password" className="form-label me-2">
                      رمز عبور:
                    </Label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      // placeholder="********"
                    />
                    {errors.password && touched.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                </Col>
                <Col className="mt-md-0 mt-3" md="6" xs="12">
                  <div className="d-flex align-items-center mb-1">
                    <Label className="form-label">نوع کاربر:</Label>
                    <div className="d-flex">
                      <div className="form-check">
                        <Field
                          type="radio"
                          name="userType"
                          className="form-check-input"
                          value="isTeacher"
                          onChange={() => {
                            setFieldValue("isTeacher", true);
                            setFieldValue("isStudent", false);
                          }}
                        />
                        <Label className="form-check-label me-2">استاد</Label>
                      </div>
                      <div className="form-check">
                        <Field
                          type="radio"
                          name="userType"
                          className="form-check-input"
                          value="isStudent"
                          onChange={() => {
                            setFieldValue("isTeacher", false);
                            setFieldValue("isStudent", true);
                          }}
                        />
                        <Label className="form-check-label me-2">دانشجو</Label>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardBody className="invoice-padding invoice-product-details">
              <Row>
                <Col sm="12" className="text-end">
                  <Button type="submit" color="primary">
                    ثبت اطلاعات
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AddUser;
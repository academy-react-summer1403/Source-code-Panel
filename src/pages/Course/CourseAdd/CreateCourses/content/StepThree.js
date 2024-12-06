// ** React Imports
import { Fragment } from "react";

import { Button } from "reactstrap"

// ** formik Import
import { Field, Form, Formik } from "formik";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const StepThree = ({ stepper, setThirdLv, addCoursess }) => {
    return (
        <Fragment>
            <div class="w-75 mx-auto " style={{ height: "300px" }}>
                <Formik
                    initialValues={{ Cost: "", UniqeUrlString: "", StartTime: "", EndTime: "" }}
                    onSubmit={(value) => setThirdLv(value)}
                >
                    <Form
                        // style={{ height: "200px" }}
                        className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded"
                    >
                        <Field
                            name="UniqeUrlString"
                            placeholder="کد یکتا"
                            className="p-1 w-100"
                        />

                        <Field
                            type="number"
                            name="Cost"
                            placeholder=" هزینه دوره "
                            className="p-1 w-100"
                        />

                        <Field
                            type="date"
                            name="StartTime"
                            placeholder=" زمان شروع دوره "
                            className="p-1 w-100"
                        />

                        <Field
                            type="date"
                            name="EndTime"
                            placeholder="زمان پایان دوره"
                            className="p-1 w-100"
                        />
                        <Button color="primary" className="btn " onClick={() => { stepper.next() }}>
                            ثبت
                        </Button>
                    </Form>
                </Formik>
            </div>
        </Fragment>
    );
};

export default StepThree;
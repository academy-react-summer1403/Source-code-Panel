// ** React Imports
import { Fragment } from "react";

// ** formik Imports
import { Field, Form, Formik } from "formik";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const StepFour = ({ stepper, setForthLv }) => {
    return (
        <Fragment>
            <div class="w-75 mx-auto p-3 mb-3 mt-2" style={{ height: "300px" }}>
                <Formik
                    initialValues={{ StartTime: "", EndTime: "" }}
                    onSubmit={(value) => setForthLv(value)}
                >
                    <Form
                        style={{ height: "150px" }}
                        className="d-flex flex-column gap-1 shadow p-2 mb-5 bg-body rounded"
                    >
                        <Field
                            type="date"
                            name="StartTime"
                            placeholder=" زمان شروع دوره "
                            className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                        />

                        <Field
                            type="date"
                            name="EndTime"
                            placeholder="زمان پایان دوره"
                            className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                        />

                        <button
                            onClick={() => stepper.next()}
                            className="btn btn-success"
                        >
                            ثبت
                        </button>
                    </Form>
                </Formik>
            </div>
        </Fragment>
    );
};

export default StepFour;
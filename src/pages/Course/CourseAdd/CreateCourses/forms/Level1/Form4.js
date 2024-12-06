// ** Formik
import { Field, Form, Formik } from "formik";

const FourthForms = ({ setForthLv }) => {
    return (
        <>
            <div className=" shadow  bg-body rounded p-3">


                <Formik
                    initialValues={{ StartTime: "", EndTime: "" }}
                    onSubmit={(value) => setForthLv(value)}
                >
                    <Form
                        style={{ height: "150px" }}
                        className="d-flex flex-column gap-1 shadow pt-2 mb-5 bg-body rounded"
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


                        <button className="btn btn-success">ثبت</button>
                    </Form>
                </Formik>
            </div>

        </>
    );
};
export default FourthForms;
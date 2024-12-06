// ** React Imports
import { Fragment } from "react";

import { Button, Label } from "reactstrap";

// ** formik Imports
import { Field, Form, Formik } from "formik";
// import WizardModern from "../WizardModern";

const StepOne = ({
    stepper,
    setFirstLv,
    title,
    files,
    setFiles,
    capacity,
    miniDescribe,
    setMiniDescribe,
    setDescribe,
    setTitle,
    setCapacity,
    describe
}) => {


    const OnSubmit = (e) => {
        const { title, capacity, describe, files, miniDescribe } = e;


        setTitle(title)
        setCapacity(capacity)
        setDescribe(describe)
        setFiles(files)
        setMiniDescribe(miniDescribe)
    }

    return (
        <Fragment>
            <div class="w-75 mx-auto mb-3 mt-2" style={{ height: "auto" }}>
                <Formik
                    initialValues={{
                        Title: "",
                        Describe: "",
                        MiniDescribe: "",
                        Capacity: "",
                        Image: "",
                    }}
                    onSubmit={(value) => OnSubmit(value)}
                >
                    <Form
                        // style={{ height: "290px" }}
                        className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded"
                    >
                        <Field
                            name="Title"
                            placeholder=" موضوع دوره "
                            className="p-1 w-100"
                        />
                        <Field
                            name="Describe"
                            placeholder="توضیحات"
                            className="p-1 w-100"
                        />

                        <Field
                            name="MiniDescribe"
                            placeholder=" توضیحات کوتاه"
                            className="p-1 w-100"
                        />
                        <Field
                            type="number"
                            name="Capacity"
                            placeholder="ظرفیت دوره"
                            className="p-1 w-100 "
                        />
                        <div
                            className="shadow p-1"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Label className="w-100 d-flex ">انتخاب عکس</Label>
                            <Field type="file" name="Image" className="p-1 w-100 d-flex" />
                        </div>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => stepper.next()}
                            className="btn "
                        >
                            ثبت
                        </Button>
                    </Form>
                </Formik>
            </div>
        </Fragment>
    );
};

export default StepOne;
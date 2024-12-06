// ** Formik
import { Field, Form, Formik } from 'formik'

const FirstForms = ({ setFirstLv }) => {
    return (
        <Formik
            initialValues={{
                Title: "",
                Describe: "",
                MiniDescribe: "",
                Capacity: "",
            }}
            onSubmit={(value) => setFirstLv(value)}
        >
            <Form
                style={{ height: "290px" }}
                className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded"
            >
                <Field
                    name="Title"
                    placeholder=" موضوع دوره "
                    className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />
                <Field
                    name="Describe"
                    placeholder="توضیحات"
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />

                <Field
                    name="MiniDescribe"
                    placeholder=" توضیحات کوتاه"
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />
                <Field
                    type="number"
                    name="Capacity"
                    placeholder="ظرفیت دوره"
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />
                <button type="submit" className="btn btn-success">ثبت</button>
            </Form>
        </Formik>
    )
};
export default FirstForms;
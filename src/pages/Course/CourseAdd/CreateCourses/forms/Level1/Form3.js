// ** Formik
import { Field, Form, Formik } from 'formik'

const ThirdForms = ({ setThirdLv }) => {
    return (
        <Formik
            initialValues={{ Cost: "", UniqeUrlString: "" }}

            onSubmit={(value) => setThirdLv(value)}
        >
            <Form style={{ height: '200px' }} className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded">

                <Field
                    type="number"
                    name="Cost"
                    placeholder=" هزینه دوره "
                    className='relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3'
                />

                <Field

                    name="UniqeUrlString"
                    placeholder="کد یکتا"
                    className='relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3'
                />

                <button className="btn btn-success">ثبت</button>
            </Form>
        </Formik>
    )
};
export default ThirdForms;
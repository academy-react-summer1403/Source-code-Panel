
// ** React Imports
import { Fragment } from 'react'

// ** formik Imports
import { Field, Form, Formik } from 'formik'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { Button } from 'reactstrap'




const StepTow = ({ stepper, type, setSecondLv, courseItems }) => {

    return (
        <Fragment>
            <div class="w-75 mx-auto " style={{ height: "scroll" }}>
                <Formik
                    initialValues={{
                        CourseTypeId: [1],
                        CourseLvlId: [1],
                        TeacherId: [1],
                        TremId: 1,
                        ClassId: [1],
                        SessionNumber: [],
                    }}

                    onSubmit={(value) => setSecondLv(value)}
                >
                    <Form className="d-flex flex-column gap-1 shadow pt-2 p-3 mb-5 bg-body rounded">

                        <Field
                            type="number"
                            as="select"
                            name="CourseLvlId"
                            placeholder="آیدی سطح دوره"
                            className="p-1 w-100"
                        >
                            {
                                courseItems?.courseLevelDtos.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.levelName}
                                        </option>
                                    );
                                })}
                        </Field>
                        <Field
                            as="select"
                            name="CourseTypeId"
                            placeholder=" آیدی نوع دوره  "
                            className="p-1 w-100"
                        >
                            {courseItems?.courseTypeDtos &&
                                courseItems?.courseTypeDtos.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.typeName}
                                        </option>
                                    );
                                })}
                        </Field>
                        <Field
                            type="number"
                            as="select"
                            name="ClassId"
                            placeholder="آیدی کلاس دوره"
                            className="p-1 w-100"
                        >
                            {
                                courseItems?.classRoomDtos.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.classRoomName}
                                        </option>
                                    );
                                })}
                        </Field>

                        <Field
                            type="number"
                            as="select"
                            name="TeacherId"
                            placeholder="آیدی استاد دوره"
                            className="p-1 w-100"
                        >
                            {
                                courseItems?.teachers.map((item, index) => {
                                    return (
                                        <option key={index} value={item.userId}>
                                            {item.fullName}
                                        </option>
                                    );
                                })}
                        </Field>
                        <Field
                            type="number"
                            as="select"
                            name="TremId"
                            placeholder=" آیدی ترم "
                            className="p-1 w-100"
                        >
                            {courseItems &&
                                courseItems.termDtos.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.termName}
                                        </option>
                                    );
                                })}
                        </Field>
                        <Field
                            type="number"
                            name="SessionNumber"
                            placeholder="تعداد جلسه"
                            className="p-1 w-100"
                        />
                        <Button color="primary" className="btn " onClick={() => stepper.next()}>ثبت</Button>
                    </Form>
                </Formik>
            </div>

        </Fragment>
    )
}

export default StepTow

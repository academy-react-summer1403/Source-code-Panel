// ** Formik
import { Field, Form, Formik } from 'formik'
import { useState } from 'react';

const SecondForms = ({ courseItems, setSecondLv }) => {


    return (
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
            <Form className="d-flex flex-column gap-1 shadow px-3 pt-1  bg-body rounded">
                <Field
                    as="select"
                    name="CourseTypeId"
                    placeholder=" آیدی نوع دوره  "
                    className="relative border-b w-[100%]  pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
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
                    name="CourseLvlId"
                    placeholder="آیدی سطح دوره"
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
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
                    type="number"
                    as="select"
                    name="ClassId"
                    placeholder="آیدی کلاس دوره"
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
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
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
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
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
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
                    className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
                />
                <button className="btn btn-success">ثبت</button>
            </Form>
        </Formik>
    )
};
export default SecondForms;
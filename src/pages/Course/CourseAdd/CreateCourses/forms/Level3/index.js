// ** Formik
import { Field, Form, Formik } from 'formik'
import { Button } from 'reactstrap';
import OptionComponent from "../../../../../Select/SelectOptions";


const ThirdLevel = () => {
  return (
    <>
      <div className=' p-3 mb-5 bg-body rounded'>

        <OptionComponent />

        <Formik
          initialValues={{
            GroupName: "",
            CourseId: [],
            GroupCapacity: [],

          }}
          onSubmit={(value) => update(value)}
        >
          <Form style={{ height: '290px' }} className="d-flex flex-column gap-1 shadow mt-2">
            <Field
              type="number"
              as="select"
              name="GroupName"
              placeholder=" نام گروه  "
              className="relative border-b w-[100%] h-25 pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
            >
              {/* {group &&
                group.map((item, index) => {
                  return (
                    <option key={index} value={item.groupName}>
                      {item.groupName}
                    </option>
                  );
                })} */}
            </Field>

            <Field
              type="number"
              as="select"
              name="CourseId"
              placeholder="آی دی دوره"
              className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
            >
              {/* {group &&
                group.map((item, index) => {
                  return (
                    <option key={index} value={item.courseId}>
                      {item.courseName}
                    </option>
                  );
                })} */}
            </Field>

            <Field
              as="select"
              name="GroupCapacity"
              placeholder=" ظرفیت گروه "
              className="relative border-b w-[100%] h-[50px] pr-12 shadow-md focus:outline-none focus:ring focus:ring-textCol3"
            >
            </Field>

            <Button color="primary">ثبت </Button>
            {/* onClick={addGroup} */}
          </Form>
        </Formik>
      </div>

    </>

  )
};
export default ThirdLevel;
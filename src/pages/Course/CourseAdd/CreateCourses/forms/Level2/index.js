// ** Formik
import { Field, Form, Formik } from 'formik'
import { Button } from 'reactstrap';
import OptionComponent from "../../../../../Select/SelectOptions";


const SecondLevel = () => {
    return (
        <>
            <div className='d-flex flex-column gap-3 shadow p-3 mb-5 bg-body rounded'>
                <OptionComponent />
                <Button color="primary" > ثبت </Button>
            </div>
        </>
    )
};
export default SecondLevel;
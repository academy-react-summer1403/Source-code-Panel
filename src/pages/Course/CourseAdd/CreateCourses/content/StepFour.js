// ** React Imports
import { Fragment } from "react";

// ** select Imports
import OptionComponent from "../../../../Select/SelectOptions";

import { Formik } from "formik";

const StepFour = ({ tech, setSelectedTech, useTech, onSubmit }) => {
    return (
        <Fragment>
            <Formik onSubmit={() => onSubmit()}>
                <div class="w-75 mx-auto mb-3 mt-2" style={{ height: "300px" }}>
                    <div className="d-flex flex-column gap-1 shadow p-3 mb-5 bg-body rounded">
                        <OptionComponent
                            tech={tech}
                            setSelectedTech={setSelectedTech}
                            useTech={useTech}
                        />
                    </div>
                </div>
            </Formik>
        </Fragment>
    );
};

export default StepFour;
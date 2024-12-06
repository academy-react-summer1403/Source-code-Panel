// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "../../wizard/index";

// ** Steps
import StepFour from "./content/StepFour";
import StepTow from "./content/StepTwo";
import StepOne from "./content/StepOne";
import StepThree from "./content/StepThree";

// Api
import {
    addTech,
    getCoursesStepOne,
    GetGroupsOfCourse,
    getTech,
    Post,
} from "../../../../core/services/api/Course/CourseAdd/CourseAdd";

// ** Utils
import { onFormData } from "../../../../utility/DataHelper";


const CreateCourseForm = () => {
    // ** Ref
    const ref = useRef(null);

    // ** State
    const [stepper, setStepper] = useState(null);
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState();
    const [cost, setCost] = useState();
    const [capacity, setCapacity] = useState();
    const [sessionNumber, setSessionNumber] = useState();
    const [miniDescribe, setMiniDescribe] = useState();
    const [describe, setDescribe] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [courseLvlId, setCourseLvlId] = useState();
    const [courseTypeIdState, setCourseTypeIdState] = useState();
    const [teacherIdState, setTeacherIdState] = useState();
    const [classIdState, setClassIdState] = useState();
    const [termIdState, setTermIdState] = useState();
    const [googleTitle, setGoogleTitle] = useState();
    const [googleSchema, setGoogleSchema] = useState();
    const [uniqueUrlString, setUniqueUrlString] = useState();
    const [shortLink, setShortLink] = useState();
    const [courseId, setCourseId] = useState();
    const [createCourseOptions, setCreateCourseOptions] = useState();
    const [courseItems, setCourseItems] = useState(null);
    // courseItems && console.log(courseItems);

    const [firstLv, setFirstLv] = useState([]);
    const [secondLv, setSecondLv] = useState([]);
    const [thirdLv, setThirdLv] = useState([]);
    // const [forthLv, setForthLv] = useState([]);

    const [tech, setTech] = useState([]);
    const [idCourse, setIdCourse] = useState("");
    const [selectedTech, setSelectedTech] = useState([]);


    // **API
    const getCourses = async () => {
        try {
            const getCourseList = await getCoursesStepOne();
            // console.log(getCourseList);
            setCourseItems(getCourseList);
        } catch (error) {
            throw new Error("ERROR: ", error);
        }
    };

    const onSubmit = async () => {
        const courseData = {
            image: files[0],
            tumbImage: files[0],
            imageAddress: files[0],
            title,
            cost,
            capacity,
            sessionNumber,
            miniDescribe,
            describe: JSON.stringify(describe),
            startTime,
            endTime,
            courseLvlId,
            courseTypeId: courseTypeIdState,
            classId: classIdState,
            tremId: termIdState,
            teacherId: teacherIdState,
            googleTitle,
            googleSchema,
            uniqeUrlString: uniqueUrlString,
            shortLink,
        };

        try {

            const formData = onFormData(courseData);
            const createCourse = await Post(formData);

            if (createCourse.success) {
                toast.success("دوره با موفقیت ثبت شد !");
                setCourseId(createCourse.id);
                stepper.next();
            }
        } catch (error) {
            toast.error("مشکلی در ارسال دوره به وجود آمد !");
        }
    };

    const getTechnologi = async () => {
        try {
            const getTechList = await getTech();
            setTech(getTechList);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    const useTech = async () => {
        try {
            const addTechh = await addTech(idCourse, selectedTech);

            console.log(addTechh);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    // **useEffect

    useEffect(() => {
        getCourses();
        getTechnologi();
    }, []);

    const steps = [
        {
            id: "account-details",
            title: "(مرحله اول)",
            subtitle: "اطلاعات دوره را وارد نمایید.",
            content: (
                <StepOne
                    title={title}
                    setTitle={setTitle}
                    files={files}
                    setFiles={setFiles}
                    setCapacity={setCapacity}
                    capacity={capacity}
                    miniDescribe={miniDescribe}
                    setDescribe={setDescribe}
                    setMiniDescribe={setMiniDescribe}
                    describe={describe}
                    stepper={stepper}
                    type="wizard-vertical"
                    setFirstLv={setFirstLv}
                />
            ),
        },
        {
            id: "personal-info",
            title: "(مرحله دوم)",
            subtitle: "اطلاعات دوره را وارد نمایید.",
            content: (
                <StepTow
                    stepper={stepper}
                    type="wizard-vertical"
                    courseItems={courseItems && courseItems}
                    setSecondLv={setSecondLv}
                />
            ),
        },
        {
            id: "personal-info2",
            title: "(مرحله سوم)",
            subtitle: "اطلاعات دوره را وارد نمایید.",
            content: (
                <StepThree
                    stepper={stepper}
                    type="wizard-vertical"
                    setThirdLv={setThirdLv}
                />
            ),
        },
        {
            id: "step-address",
            title: "(مرحله چهارم)",
            subtitle: "تکنولوژی را وارد نمایید.",
            content: (
                <StepFour
                    setSelectedTech={setSelectedTech}
                    tech={tech}
                    onSubmit={onSubmit}
                    useTech={useTech}
                    type="wizard-vertical"
                />
            ),
        }
    ];

    return (
        <div className="vertical-wizard border">
            <Wizard
                type=""
                ref={ref}
                steps={steps}
                options={{
                    linear: false,
                }}
                instance={(el) => setStepper(el)}
            />
        </div>
    );
};

export default CreateCourseForm;
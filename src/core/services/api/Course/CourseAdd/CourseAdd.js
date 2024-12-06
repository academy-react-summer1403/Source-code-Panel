
import http from "../../../interceptor/index";

export const getCoursesStepOne = async () => {
    try {
        const res = await http.get("/Course/GetCreate");
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const Post = async (form) => {
    try {
        const res = await http.post("/Course", form);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getTech = async () => {
    try {
        const res = await http.get("/Home/GetTechnologies");
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const addTech = async (form, getTech) => {
    try {
        const res = await http.post(
            `/Course/AddCourseTechnology?courseId=${form}`
        );
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const GetGroupsOfCourse = async () => {
    try {
        const res = await http.get("/CourseGroup");
        //console.log(result);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

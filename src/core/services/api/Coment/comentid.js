import instance from "../../interceptor/index";

export const getCoursesComent = async (id) => {
    try {
        const res = await instance.get(`/Course/GetCourseCommnets/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
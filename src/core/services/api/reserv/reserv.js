import instance from "../../interceptor/index";

export const getCoursesReserv = async (id) => {
    try {
        const res = await instance.get(`/CourseReserve/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
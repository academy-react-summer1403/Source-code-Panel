import instance from "../../interceptor/index";

export const getReserv = async (id) => {
    try {
        const res = await instance.get(`/CourseReserve`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

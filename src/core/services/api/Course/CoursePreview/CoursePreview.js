import instance from "../../../interceptor/index";

export const getCoursesPre = async (id) => {
    try {
        const res = await instance.get(`/Course/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const courseEditApi = async (formdata) => {
    try {
        const res = await instance.put("/Course");
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
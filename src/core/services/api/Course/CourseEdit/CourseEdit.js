import instance from "../../../interceptor/index";

export const courseEditApi = async (formdata) => {
    try {
        const res = await instance.put("/Course", formdata);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
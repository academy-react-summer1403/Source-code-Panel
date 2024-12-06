import instance from "../../interceptor/index";

export const getAllCoursesComent = async () => {
    try {
        const res = await instance.get(`/Course/CommentManagment?RowsOfPage=100`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
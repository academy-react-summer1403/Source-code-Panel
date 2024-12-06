import instance from "../../interceptor/index";

export const useUserDetail = async (id) => {
    try {
        const res = await instance.get(`/User/UserDetails/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

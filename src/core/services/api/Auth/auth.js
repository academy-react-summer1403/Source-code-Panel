import http from '../../interceptor/index';
export const loginAPI = async (user) => {
    try {
        const response = await http.post("/sign/login", user);
        return response;
    } catch (error) {
        return false;
    }
};
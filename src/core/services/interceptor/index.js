import axios from "axios";
import { removeItem } from "../../../@core/components/common/storage.services";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    baseURL: baseURL,
});
const onSuccess = (response) => {
    return response.data;
};

const onError = (err) => {
    console.log(err);

    if (err.response) {
        if (err.response.status >= 400 && err.response.status < 500) {
            // alert("Client error: " + err.response.status);
        }

        if (err.response.status === 401) {
            removeItem("token");
            window.location.pathname = "/courses";
        }
    } else {
        console.error("Error: No response from server.");
        // alert("An error occurred: No response from server.");
    }

    return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
    const token = localStorage.getItem("token");

    opt.headers.Authorization = "Bearer " + token;
    return opt;
});

export default instance;

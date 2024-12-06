// فایل API
import http from "../../interceptor/index";

export const getCourseListApi = async (currentPage, rowsPerPage, sortColumn, sort, searchText) => {
    try {
        const response = await http.get("/User/UserMannage", {
            params: {
                page: currentPage,
                size: rowsPerPage,
                sort: sortColumn,
                direction: sort,
                search: searchText,
            },
        });
        console.log(response.listUser)
        return response.listUser;
    } catch (error) {
        console.log("Error fetching course data:", error);
        return { listUser: [], totalCount: 0 };
    }
};

import http from "../../../interceptor/index"



export const getCourseListApi = async (
    pageNumber,
    rowsOfPage,
    sortingCol,
    sortType,
    query,
    costDown,
    costUp,
    techCount,
    listTech,
    courseLevelId,
    courseTypeId,
    startDate,
    endDate,
    teacherId) => {
    try {
        const Res = await http.get("/Home/GetCoursesWithPagination", {
            params: {
                pageNumber,
                rowsOfPage,
                sortingCol,
                sortType,
                query,
                costDown,
                costUp,
                techCount,
                listTech,
                courseLevelId,
                courseTypeId,
                startDate,
                endDate,
                teacherId,
            },
        })
        return Res
    } catch (error) {
        console.log(error, "error")
    }
}
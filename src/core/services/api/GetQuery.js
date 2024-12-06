import { useQuery } from "@tanstack/react-query";
import http from "../interceptor/index";

export const getQuery = (queryKey, apiAddress, variable) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: variable ? [queryKey, variable] : [queryKey],
        queryFn: async () => await http.get(apiAddress)
    })

    if (isError) <div>"Fetching is onSuccessfull"</div>;
    if (isLoading) <div> "Loading" </div>;

    return data;
};

export const getQueryFiltterByCount = (queryKey, apiAddress, count, variable) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: variable ? [queryKey, variable] : [queryKey],
        queryFn: async () => {
            const res = await http.get(apiAddress)
            return res.filter((el) => el.id <= count);
        }
    })

    if (isError) <div>"Fetching is onSuccessfull"</div>;
    if (isLoading) <div> "Loading" </div>;

    return data;
};

export const getQueryNoApi = (queryKey, queryFn, variable) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: variable ? [queryKey, variable] : [queryKey],
        queryFn: () => queryFn
    })

    if (isError) <div>"Fetching is onSuccessfull"</div>;
    if (isLoading) <div> "Loading" </div>;

    return data;
}

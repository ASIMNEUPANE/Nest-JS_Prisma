
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";


const useGetById = (qkey: string, urls: string, id: string) => {
    const str = JSON.stringify({ id })

    const { isError, isLoading, data } = useQuery({
        queryKey: [qkey, str],
        queryFn: async () => {

            const { data } = await API.get(`${urls}/${id}`);

            return data;
        },

    })

    return { isError, isLoading, data };
};


export default useGetById;






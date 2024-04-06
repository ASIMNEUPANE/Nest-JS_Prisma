
import { URLS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";
import BlogStore from "@/store/BlogStore";
import { useEffect } from "react";

type Category = "Travel" | "Food" | "Lifestyle" | "TECHNOLOGY";
type Status = "Published" | "DRAFT";
type Blog = {
    id: number;
    title: string;
    content: string;
    description: string;
    category: Category;
    status: Status;
    totalWord: number;
    images?: string | null;
    author: string;
};



const useBlogs = (page: number, limit: number) => {
    const { setBlogs } = BlogStore((state) => state);
    const str = JSON.stringify({ page, limit })

    const qn = useQuery({
        queryKey: ['getblogs', str],
        queryFn: async () => {
            const params = {
                page: page,
                limit: limit
            };
            const { data } = await API.get(URLS.BLOGS, { params });

            return data
        },
        // select(data) {

        //             // },

    })


    useEffect(() => {
        if (qn.data) {
            setBlogs(qn.data.data);
        }
    }, [qn.data, setBlogs]);

    return qn;
};








export default useBlogs;

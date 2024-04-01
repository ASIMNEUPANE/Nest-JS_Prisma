// 'use client'

// import { URLS } from "@/constants";
// import { useQuery } from "@tanstack/react-query";
// import API from "@/utils/API";
// import BlogStore from "@/store/BlogStore";
// import { useEffect } from "react";
// type Category = "Travel" | "Food" | "Lifestyle" | "TECHNOLOGY"
// type Status = "Published" | "DRAFT"
// type Blog = {
//     id: number;
//     title: string;
//     content: string;
//     description: string;
//     category: Category;
//     status: Status;
//     totalWord: number;
//     images?: string | null;
//     author: string;

// }
// const listBlog = (page, limit) => {
//     const { setBlogs } = BlogStore((state) => state)

//     const str = JSON.stringify({ page, limit })

//     const qn = useQuery(
//         {
//             queryKey: ['getblogs', str],
//             queryFn: listBlog,
//             // select(data) {

//             // },

//         }

//         const res = await API.get(
//             `${URLS.BLOGS}?page=${page = 1}&limit=${limit = 4}`
//         );
//     return res.data;
//         }

// useEffect(() => {
//     if (qn.data) {
//         setBlog(qn.data)

//     }
// }, [])




// return qn

// }

// export default useBlogs;



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
            const { data } = await API.get(`${URLS.BLOGS}?page=${page}&limit=${limit}`);
            return data
        },
    })

    useEffect(() => {
        if (qn.data) {
            setBlogs(qn.data.data);
        }
    }, [qn.data, setBlogs]);

    return qn;
};


export default useBlogs;

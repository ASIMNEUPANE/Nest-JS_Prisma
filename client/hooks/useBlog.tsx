'use client'

import { URLS } from "@/constants";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import API from "@/utils/API";
import blogStore from "@/store/store";
type Category = "Travel" | "Food" | "Lifestyle" | "TECHNOLOGY"
type Status = "Published" | "DRAFT"
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
  
  }
const useBlog = () => {
    const { addBlog } = blogStore((state) => state)


    const getAll = async (page: number, limit: number):Promise<Blog[] | null> => {
        const result = await API.get(
            `${URLS.BLOGS}?page=${page}&limit=${limit}`
        )
        addBlog(result.data)
        return result.data;

    }
    return { getAll }
}

export default useBlog;
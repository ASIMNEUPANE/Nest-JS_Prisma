'use client'

import Link from "next/link"
import BlogStore from "@/store/BlogStore";
import { URLS } from "@/constants";
import { useEffect } from "react";
import useList from "@/hooks/useList";
function page() {
    const { blogs, setBlogs } = BlogStore((state) => state);

    let { isLoading, isError, data } = useList('listBlog', URLS.BLOGS, 1, 5)

    useEffect(() => {
        if (data) {
            setBlogs(data.data);
        }
    }, [data, setBlogs]);
    return (




        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 mx-auto mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            author
                        </th>
                        <th scope="col" className="px-6 py-3 bg-green-500  hover:bg-green-600  hover:focus-visible hover:underline ">
                            <Link href={'/admin/blog/add'}>
                                Add
                            </Link>
                        </th>


                    </tr>
                </thead>
                <tbody> {blogs && blogs.length > 0 ? (blogs.map((blog, index) => {
                    return (
                        <tr key={index} className=" text-white bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600">
                            <th scope="row" className=" text-white px-6 py-4 font-medium   dark:text-white">
                                {blog.title}
                            </th>
                            <td className="px-6 py-4">
                                {blog.category}
                            </td>
                            <td className="px-6 py-4">
                                {blog.status}
                            </td>
                            <td className="px-6 py-4">
                                {blog.author}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link href={`/admin/blog/${blog.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                            </td>
                        </tr>

                    )
                })) : null}


                </tbody>
            </table>
        </div>


    )
}

export default page
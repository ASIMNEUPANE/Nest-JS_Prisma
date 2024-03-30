"use client"
import useBlog from "@/hooks/useBlog"
import blogStore from "@/store/store"
import { useQuery } from "@tanstack/react-query"
export default function blog() {
    const { getAll } = useBlog()
    const { blog } = blogStore((state) => state)
    const { data, isError, isLoading } = useQuery({
        queryKey: ["post"],
        queryFn: getAll,


    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
if(blog)
    return (
        <>
            {data.map((bb, idx) => (
                <div key={idx}>
                    <div>{bb.author}</div>
                    <div>{bb.title}</div>
                    {/* Render other properties as needed */}
                </div>
            ))}
        </>
    )


}
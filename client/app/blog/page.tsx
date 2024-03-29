"use client"
import useBlog from "@/hooks/useBlog"
import blogStore from "@/store/store"
import { useQuery } from "@tanstack/react-query"
export default function blog() {
    const {getAll} = useBlog()
    const { blog } = blogStore((state: any) => state)
    const { data, isError, isLoading } = useQuery({
        queryKey: ["post"],
        queryFn: getAll,

    })
    return  <div>
        {'hello'}
    </div>
}
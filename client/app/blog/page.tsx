"use client"
import { blogStore } from "@/store/store"
export default function blog(){
    const blog =  blogStore((state:any)=> state.blog)
    const updateBlog = blogStore((state:any)=>state.updateBlog)
    return <div>
        {blog.title}
        <input className="border " type="text" onChange={(e:any)=>{
       updateBlog({
        title:e.target.value
       })
        }} />
    </div>
}
'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BlogStore from "@/store/BlogStore";
import useBlogs from "@/hooks/useBlog";
export default function Blog() {
    const { blogs } = BlogStore((state) => state);
    console.log(blogs, 'bloggggggggg')
    const { isLoading, isError } = useBlogs(1, 2)

    if (isLoading) <div>'loadinfffff' </div>
    if (isError) <div>'error'</div>
    return (
        <div className="box m-4 flex">
            <div className="border bg-gray-400 flex flex-wrap">
                {blogs && blogs.map((blogItem, idx) => (
                    <Card key={idx}>
                        <CardHeader>
                            <CardTitle>{blogItem.title}</CardTitle>
                            <CardDescription>{blogItem.description}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <img src={blogItem.images ? blogItem.images : ''} alt={blogItem.title}></img>
                        </CardContent>
                        <CardFooter>
                            <p>By {blogItem.author}</p>
                        </CardFooter>
                    </Card>

                ))}
            </div>
        </div>
    );
}

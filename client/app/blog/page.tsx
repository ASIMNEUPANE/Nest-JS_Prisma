'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BlogStore from "@/store/BlogStore";
import useBlogs from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
    const { blogs } = BlogStore((state) => state);
    let { isLoading, isError } = useBlogs(1, 5);

    if (isLoading) {
        return (
            <div className="box m-4 flex">
                <div className="flex flex-wrap">
                    {[...Array(4)].map((_, index) => (
                        <Card className="p-3 m-1" key={index}>
                            <CardHeader>
                                <CardTitle className="pl-2">
                                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                                </CardTitle>
                                <CardDescription>
                                    <Skeleton className="w-[110px] h-[20px] rounded-full" />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="w-[250px] h-[200px] " />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }


    if (isError) {
        return <div>Error: Failed to load blogs. Please try again later.</div>;
    }

    if (blogs) {
        return (
            <div className="box m-4 flex">
                <div className="flex flex-wrap">
                    {blogs.map((blogItem) => (
                        <Card className="p-3 m-1" key={blogItem.id}>
                            <CardHeader>

                                <CardTitle className="pl-2">{blogItem.title}</CardTitle>
                                <CardDescription>{blogItem.description}</CardDescription>
                            </CardHeader>
                            <img className="w-80  h-[200px] " src={'https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg='}></img>
                            {/* <img src={blogItem.images ? blogItem.images : ''} alt={blogItem.title}></img> */}             <CardContent>

                                {/* <img className="w-80" src={blogItem.images} alt={blogItem.title} /> */}
                            </CardContent>
                            <CardFooter>
                                <h2>By: {blogItem.author}</h2>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return null; // Render nothing if no blogs are available yet
}

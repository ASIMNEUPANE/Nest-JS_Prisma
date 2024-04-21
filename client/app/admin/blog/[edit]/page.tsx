'use client'

import { URLS } from '@/constants'
import useGetById from '@/hooks/useGet'
import BlogStore from '@/store/BlogStore'
import { blogSchemaValidator } from '@/validator/blog.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function edit() {
    const { id } = useParams()
    console.log(id,'iddddddddddddd')
    const { blogs, setBlogs } = BlogStore((state) => state);

    const [blog, setBlog] = useState({
        title: '',
        content: '',
        description: '',
        category: '',
        status: '',
        totalWord: '',
    })
    type blogs = z.infer<typeof blogSchemaValidator>

    const { register, handleSubmit, formState: { errors } } = useForm<blogs>({
        resolver: zodResolver(blogSchemaValidator),
        defaultValues: {
            title: blog.title,
            content: blog.content,
            description: blog.description,
            category: 'TECHNOLOGY',
            status: 'DRAFT',
            totalWord: '',


        },
    })

    useEffect(() => {

        const { data } = useGetById('blog_update', URLS.BLOGS, id as any )
        setBlog((prev) => {
            return { ...prev, ...data }
        })
    }, [id, useGetById])


    return (
        <div className=" p-4 ">
            <div className='flex justify-center items-center '>
                <form className="  rounded-2xl space-y-6 text-white p-5 bg-gray-800 w-3/4">
                    <div className=' pl-52 flex flex-col items-center justify-center w-3/5'>
                        <div className='p-2'  >
                            <div className='pr-2 font-semibold '>icon</div>
                            <input {...register('title')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='title' />
                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>content</div>
                            <textarea rows={2} className='bg-white text-black rounded-sm p-2 w-80' placeholder='content' />
                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>description</div>
                            <input className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='description' />
                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>category</div>
                            <input className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='category' />
                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold '>status</div>
                            <input className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='status' />
                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>author</div>
                            <input className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='author' />
                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>totalWord</div>
                            <input className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='totalWord' />
                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>images</div>
                            <input className='bg-white text-black rounded-sm p-2 w-80' type="file" placeholder='images' />
                        </div>
                        <div className='p-2'>

                            <button type='submit' className=" p-3 w-80 bg-gradient-to-r from-blue-400 to-cyan-200  font-semibold rounded-full ">Edit Blog</button>
                            <Link className='p-32 ' href={'/admin/user'}>Go Back</Link>

                        </div>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default edit
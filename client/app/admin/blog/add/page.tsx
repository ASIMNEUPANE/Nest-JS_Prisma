'use client'
import usePost from '@/hooks/usePost'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { blogSchemaValidator } from '@/validator/blog.schema'
import { URLS } from '@/constants'
import { useRouter } from "next/navigation";
function add() {
    const router = useRouter()
    type blog = z.infer<typeof blogSchemaValidator>
    const { postMutation, data, isSuccess, error, success } = usePost('listBlog')
    

    const { register, handleSubmit, formState: { errors } } = useForm<blog>({
        resolver: zodResolver(blogSchemaValidator),
        defaultValues: {
            title: '',
            content: '',
            description: '',
            category: 'TECHNOLOGY',
            status: 'DRAFT',
            totalWord: '',
            // images: ''

        },
    })

    async function onSubmit(data: blog) {
        console.log(data)

        postMutation({ urls: URLS.BLOGS, data })


    }
    console.log(success,'sicessssss')
    if (success) router.push('/admin/blog')
    return (
        <div className=" p-4 ">
            <div className='flex justify-center items-center '>
                <form onSubmit={handleSubmit(onSubmit)} className="  rounded-2xl space-y-6 text-white p-5 bg-gray-800 w-3/4">
                    <div className=' pl-52 flex flex-col items-center justify-center w-3/5'>
                        <div className='p-2'  >
                            <div className='pr-2 font-semibold '>Title</div>
                            <input {...register('title')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='title' />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>content</div>
                            <textarea {...register('content')} rows={2} className='bg-white text-black rounded-sm p-2 w-80' placeholder='content' />
                            {errors.content && <p className="text-red-500">{errors.content.message}</p>}

                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>description</div>
                            <input {...register('description')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='description' />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>category</div>
                            <input {...register('category')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='category' />
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}

                        </div>
                        <div className='p-2' >
                            <div className='pr-2 font-semibold '>status</div>
                            <input {...register('status')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='status' />
                            {errors.status && <p className="text-red-500">{errors.status.message}</p>}

                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>totalWord</div>
                            <input {...register('totalWord')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='totalWord' />
                            {errors.totalWord && <p className="text-red-500">{errors.totalWord.message}</p>}

                        </div>
                        {/* <div className='p-2'>
                            <div className='pr-2 font-semibold'>images</div>
                            <input  {...register('images')} className='bg-white text-black rounded-sm p-2 w-80' type="file" placeholder='images' />
                            {errors.images && <p className="text-red-500">{errors.images.message}</p>}

                        </div> */}
                        <div className='p-2'>

                            <button type='submit' className=" p-3 w-80 bg-gradient-to-r from-blue-400 to-cyan-200  font-semibold rounded-full ">Create Blog</button>
                            {error && <div className="text-red-500">{error}</div>}
                        </div>
                            <Link className='p-32 ' href={'/admin/blog'}>Go Back</Link>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default add
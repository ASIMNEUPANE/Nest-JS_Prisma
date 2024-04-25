'use client'

import { URLS } from '@/constants'
import useGet from '@/hooks/useGet'
import { blogSchemaValidator } from '@/validator/blog.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { redirect, useParams } from 'next/navigation'
import usePut from '@/hooks/usePut'
import { useRouter } from 'next/navigation'


function Edit() {
    const router = useRouter()
    type blogType = z.infer<typeof blogSchemaValidator>

    const params = useParams()
    const id = params.edit

    const { data } = useGet('blog_update', URLS.BLOGS, id as any)

    const { putMutation, error, isPending, success } = usePut('listBlog')


    const { register, handleSubmit, reset, formState: { errors } } = useForm<blogType>({
        resolver: zodResolver(blogSchemaValidator),

        defaultValues: {
            title: '',
            content: '',
            description: '',
            category: 'TECHNOLOGY',
            status: 'DRAFT',
            author: '',
            totalWord: 0,
        },
    })

    const onSubmit = async (data: blogType) => {
        console.log('click happen')

        console.log(data)
        console.log(errors);
        // postMutation({ urls: URLS.AUTH + '/register', data })

        await putMutation({ urls: `${URLS.BLOGS}/${id}`, data });

    }
    if (success) {
        redirect('/admin/blog')
    }
    useEffect(() => {

        if (data) {

            reset({ ...data })
        }
    }, [data, reset])


    return (
        <div className=" p-4 flex justify-center items-center bg-green-800">
            <div className='flex justify-center items-center '>
                <form onSubmit={handleSubmit(onSubmit)} className="  rounded-2xl space-y-6 text-white p-5 bg-gray-800 w-3/4">
                    <div className=' pl-52 flex flex-col items-center justify-center w-3/5'>
                        <div className='p-2'  >
                            <div className='pr-2 font-semibold '>icon</div>
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
                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>author</div>
                            <input {...register('author')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='author' readOnly />
                            {errors.author && <p className="text-red-500">{errors.author.message}</p>}
                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>totalWord</div>
                            <input {...register('totalWord')} className='bg-white text-black rounded-sm p-2 w-80' type="number" placeholder='totalWord' />
                            {errors.totalWord && <p className="text-red-500">{errors.totalWord.message}</p>}
                        </div>
                        {/* <div className='p-2'>
                            <div className='pr-2 font-semibold'>images</div>
                            <input  {...register('images')} className='bg-white text-black rounded-sm p-2 w-80' type="file" placeholder='images' />
                            {errors.images && <p className="text-red-500">{errors.images.message}</p>}
                        </div>  */}

                    </div>
                    <div className='flex justify-center items-center '>

                        <button type='submit' className=" p-3 w-80 bg-gradient-to-r from-blue-400 to-cyan-200  font-semibold rounded-full ">Edit Blog</button>
                        <Link className='p-2 ' href={'/admin/blog'}>Go Back</Link>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}

                </form>
            </div>
        </div>
    )
}

export default Edit
'use client'
import { URLS } from "@/constants"
import useGet from "@/hooks/useGet"
import useList from "@/hooks/useList"
import usePut from "@/hooks/usePut"
import { userSchemaValidator } from "@/validator/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

function edit() {
    type UserType = z.infer<typeof userSchemaValidator>
    const params = useParams()
    const id = params.edit

    const { data } = useGet('user_update', URLS.USERS, id as any)

    const { putMutation, error, isPending, success } = usePut('listUser')


    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserType>({
        resolver: zodResolver(userSchemaValidator),

        defaultValues: {
            name: " ",
            email: "",
            password: "",
            images: ""


        }
    })

    const onSubmit = (data: UserType) => {
        console.log('clickkkk')
    }

    useEffect(() => {

        if (data) {

            reset({ ...data })
        }
    }, [data, reset])


    return (
        <div className=" p-4 ">
            <div className='flex justify-center items-center '>
                <form onSubmit={handleSubmit(onSubmit)} className="  rounded-2xl space-y-6 text-white p-5 bg-gray-800 w-3/4">
                    <div className=' pl-52 flex flex-col items-center justify-center w-3/5'>
                        <div className='p-2'  >
                            <div className='pr-2 font-semibold '>Name</div>
                            <input {...register('name')} className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='Name' />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                        </div>

                        <div className='p-2' >
                            <div className='pr-2 font-semibold'>Email</div>
                            <input {...register('email')} className='bg-white text-black rounded-sm p-2 w-80' type="email" placeholder='Email' />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>Password</div>
                            <input {...register('password')} className='bg-white text-black rounded-sm p-2 w-80' type="password" placeholder='Password' />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        </div>
                        <div className='p-2'>
                            <div className='pr-2 font-semibold'>images</div>
                            <input {...register('images')} className='bg-white text-black rounded-sm p-2 w-80' type="file" placeholder='Images' />
                            {errors.images && <p className="text-red-500">{errors.images.message}</p>}

                        </div>
                        <div className='p-2'>

                            <button type='submit' className=" p-3 w-80 bg-gradient-to-r from-blue-400 to-cyan-200  font-semibold rounded-full ">Update User</button>
                            <Link className='p-32 ' href={'/admin/user'}>Go Back</Link>

                        </div>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default edit
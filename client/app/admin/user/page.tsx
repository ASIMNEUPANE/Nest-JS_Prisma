'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdBlock } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { URLS } from "@/constants";
import useList from '@/hooks/useList';
type User = {
    id:string;
    name: string;
    email: string;
    password: string;
    images?: string;
    roles?: string[];
    isActive: boolean;
    isArchive: boolean;

};
function user() {
    let { isLoading, isError, data } = useList('listUser', URLS.USERS, 1, 5)
    const [users, setUsers] = useState<User[]>([]); // Initialize with an empty array


    useEffect(() => {
        if (data?.data) {
            setUsers(data.data);
            console.log(data.data, 'useEffect')
        }
    }, [data]);
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 mx-auto mt-3">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Roles
                        </th>
                        <th scope="col" className="px-6 py-3">
                            isActive
                        </th>
                        <th scope="col" className="px-6 py-3">
                            IsArchive
                        </th>
                        <th scope="col" className="px-6 py-3 bg-green-500  hover:bg-green-600  hover:focus-visible hover:underline ">
                            <Link href={'/admin/user/add'}>
                                Add
                            </Link>
                        </th>


                    </tr>
                </thead>
                <tbody>

                    {users && users.length > 0 ? (users.map((user, index) => {

                        return <tr key={index} className=" text-white bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600">
                            <th scope="row" className=" text-white px-6 py-4 font-medium   dark:text-white">
                                {user.id}
                            </th>
                            <th scope="row" className=" text-white px-6 py-4 font-medium   dark:text-white">
                                {user.name}
                            </th>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.roles}
                            </td>
                            <td className="px-6 py-4">
                                {user.isActive ? 'Yes' :'No'}
                            </td>
                            <td className="px-6 py-4">
                                {user.isArchive ? 'Yes' : 'No'}
                            </td>
                            <td className="px-6 py-4 text-right flex gap-2">
                                <button><MdBlock color='black ' size={25} /></button>
                                <button className=''><MdDelete color='red' size={25} />
                                </button>
                                <Link href={`/admin/user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><GrEdit size={25} />
                                </Link>
                            </td>
                        </tr>
                    })) : (null)}



                </tbody>
            </table>
        </div>
    )
}

export default user
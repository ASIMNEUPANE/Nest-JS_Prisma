import Link from 'next/link'
import React from 'react'
import { MdBlock } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
function user() {
    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 mx-auto mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                    <tr>
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
                    <tr className=" text-white bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600">
                        <th scope="row" className=" text-white px-6 py-4 font-medium   dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                        <td className="px-6 py-4 text-right flex gap-2">
                            <button><MdBlock color='black ' size={25} /></button>
                            <button className=''><MdDelete color='red'  size={25} />
                            </button>
                            <Link href={'/admin/user/edit'} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><GrEdit  size={25} />
                            </Link>
                        </td>
                    </tr>


                </tbody>
            </table>
        </div>
    )
}

export default user
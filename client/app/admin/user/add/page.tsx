import Link from "next/link"

function add() {
    return (
        <div className=" p-4 ">
            <div className='flex justify-center items-center '>
                <form className="  rounded-2xl space-y-6 text-white p-5 bg-gray-800 w-3/4">
                    <div className=' pl-52 flex flex-col items-center justify-center w-3/5'>
                    <div className='p-2'  >
                        <div className='pr-2 font-semibold '>Name</div>
                        <input className='bg-white text-black rounded-sm p-2 w-80' type="text" placeholder='Name' />
                    </div>
                    
                    <div className='p-2' >
                        <div className='pr-2 font-semibold'>Email</div>
                        <input className='bg-white text-black rounded-sm p-2 w-80' type="email" placeholder='email' />
                    </div>
                    <div  className='p-2'>
                        <div className='pr-2 font-semibold'>Password</div>
                        <input className='bg-white text-black rounded-sm p-2 w-80' type="password" placeholder='password' />
                    </div>
                    <div  className='p-2'>
                        <div className='pr-2 font-semibold'>images</div>
                        <input className='bg-white text-black rounded-sm p-2 w-80' type="file" placeholder='images' />
                    </div>
                    <div  className='p-2'>

                    <button type='submit' className=" p-3 w-80 bg-gradient-to-r from-blue-400 to-cyan-200  font-semibold rounded-full ">Create User</button>
                    <Link className='p-32 ' href={'/admin/user'}>Go Back</Link>
                    </div>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default add
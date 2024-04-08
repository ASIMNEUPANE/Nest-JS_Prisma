import Link from "next/link"

function page() {
    return (
        <div className="m-28">
            <div className="w-64 h-12 left-[83px] top-[134px] absolute text-center text-black text-2xl font-bold font-['Poppins']">Hi, Welcome Back! 👋</div>
            <div className="w-80 h-20 left-[42px] top-[200px] absolute">
                <input className="w-80 h-12 left-0 top-[27px] absolute bg-white bg-opacity-10 rounded-lg border border-black border-opacity-40" placeholder="example@gmail.com" />
                <div className="w-14 h-5 left-[12px] top-0 absolute text-center text-stone-600 text-sm font-normal font-['Poppins']">Email</div>
            </div>
            <div className="w-80 h-20 left-[42px] top-[295px] absolute">
                <input className="w-80 h-12 left-0 top-[27px] absolute bg-white bg-opacity-10 rounded-lg border border-black border-opacity-40" placeholder="example@gmail.com" />
                <div className="w-4 h-4 left-[279px] top-[43px] absolute" />
                <div className="w-20 h-5 left-[15px] top-0 absolute text-center text-stone-600 text-sm font-normal font-['Poppins']">Password</div>
            </div>
            <div className="w-80 h-6 left-[46.20px] top-[393px] absolute">
                <button className="left-[173.80px] top-0 absolute text-red-400 text-base font-medium font-['Poppins']">Forgot Password?</button>
            </div>
            <div className="w-80 h-12 left-[43px] top-[447px] absolute">
                <div className="w-80 h-12 left-0 top-0 absolute bg-blue-700 rounded" />
                <button className="left-[134px] top-[11px] absolute text-white text-opacity-90 text-base font-semibold font-['Poppins']">Login</button>
            </div>
            <div className="w-64 h-5 left-[67.68px] top-[526px] absolute">
                <div className="w-48 h-5 left-0 top-0 absolute text-stone-950 text-base font-semibold font-['Manrope']">Don’t have an account ? </div>
                <Link href={'login'} className="w-16 h-5 left-[199.83px] top-0 absolute text-violet-950 text-base font-semibold font-['Manrope']">Sign Up</Link>
            </div>
        </div>
    )
}

export default page
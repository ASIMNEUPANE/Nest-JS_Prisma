import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { z } from "zod"


const signUpValidation = z.object({
    name: z.string().min(1),

    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z
        .string()
        .min(8, { message: "Too short" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one numeric digit" })
        .regex(/[!@#$%^&*]/, {
            message: "Must contain at least one special character",
        }),

})
type SignIn = z.infer<typeof signUpValidation>;

const [user, setUser] = useState<SignIn>({
    name: '',
    email: '',
    password: ''
})
const submit = ( ) => {

    console.log('ajsd')
}
function page() {
    return (
        <>
            <div className="h-screen flex justify-center items-center ">
                <div className="p-7 rounded bg-black">
                    <label className="ml-1 text-white">username</label>
                    <Input value={user.email}
                        onChange={(e) => {
                            setUser((prev) => {
                                return { ...prev, email: e.target.value };
                            });

                        }} className="block mt-2 w-72 rounded-md  text-white" type="text" placeholder="Username" />
                    <label className="ml-1 text-white">Email</label>
                    <Input className="block mt-2 w-72 rounded-md  text-white" type="text" placeholder="Email" />
                    <label className="ml-1 text-white">password</label>
                    <Input className="block mt-2 w-72 rounded-md  text-white" type="text" placeholder="Password" />
                    <Button className="mt-4 " onClick={submit}>Submit</Button>        </div>
            </div>
        </>
    )
}

export default page
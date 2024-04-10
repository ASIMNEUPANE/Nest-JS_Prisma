'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpValidation } from "@/validator/signup.schema";

type SignIn = z.infer<typeof signUpValidation>;

function Page() {

    const { register, handleSubmit, formState: { errors } } = useForm<SignIn>({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: SignIn) => {
        console.log(data);
    };

    return (
        <div className="h-screen flex justify-center items-center ">
            <div className="p-7 rounded bg-black">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="ml-1 text-white">Username</label>
                        <Input
                            {...register("name")}
                            className="block mt-2 w-72 rounded-md  text-white"
                            type="text"
                            placeholder="Username"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="ml-1 text-white">Email</label>
                        <Input
                            {...register("email")}
                            className="block mt-2 w-72 rounded-md  text-white"
                            type="text"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="ml-1 text-white">Password</label>
                        <Input
                            {...register("password")}
                            className="block mt-2 w-72 rounded-md  text-white"
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <Button className="mt-4" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default Page;

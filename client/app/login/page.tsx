// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { string, z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"
// import { useLogin } from "@/hooks/useAuth"
// import { UserStore } from "@/store/UserStore"
// import { useState } from "react"

// const FormSchema = z.object({
//   email: z
//     .string()
//     .min(1, { message: "This field has to be filled." })
//     .email("This is not a valid email."),
//   password: z
//     .string()
//     .min(8, { message: "Too short" })
// })

// export default function login() {
//   const { loginMutation, isError } = useLogin('')
//   const [errors, setError] = useState([]);
//   const { isLoggedIn, user, roles } = UserStore((state) => state);
//   console.log(isLoggedIn, user, roles, 'userrrrrrrrrrrrrrrr')
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     try {
//       let { isError } = await loginMutation( data);
//       console.log(isError, 'reactquere')
//       toast({
//         title: "You submitted the following values:",
//         description: (
//           <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//           </pre>
//         ),
//       });
//     } catch (error) {
//       console.log((error as any).response.data.message, 'pggggggerrorrrrrrrrrr')
//       setError((error as any).response.data.message)
//     }

//   }

//   if (isLoggedIn === true) {
//     return <div>your are login</div>
//   }

//   return (

//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//         {errors && <div className="text-red-500">{errors}</div>}
//       </form>
//     </Form>


//   )
// }







"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { setToken } from "@/utils/session"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import usePost from "@/hooks/usePost"
import { UserStore } from "@/store/UserStore"
import { useEffect, useState } from "react"
import { URLS } from "@/constants"
import { FormSchema } from "@/validator/login.schema"
import Loader from "@/components/Loader"

export default function login() {
  const { postMutation, data, isSuccess, error, isPending } = usePost('')
  const { setIsLoggedIn, isLoggedIn, user, roles } = UserStore((state) => state);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (isSuccess) {
      setToken(data.token)

      setIsLoggedIn(data);
    }
  }, [data])



  async function onSubmit(data: z.infer<typeof FormSchema>) {
    postMutation({ urls: URLS.AUTH + '/login', data });


    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });


  }

  if (isPending) {
    return <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  }

  if (isLoggedIn) {
    return <div>your are login</div>
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </Form>


  )
}


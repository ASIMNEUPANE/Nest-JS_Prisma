import { login } from "@/services/auth"
import { UserStore } from "@/store/UserStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const useLogin = (email: string, password: string) => {
    console.log(email, password, 'hoooooooksssssss')
    const { setIsLoggedIn } = UserStore((state) => state)

    const mutation = useMutation({
        mutationFn: async () => {

            const {data} = await login({ email, password })
            console.log(data, '==============')
            return data;
        },

    })

        useEffect(() => {
            if (mutation.isSuccess) setIsLoggedIn(mutation.data)
        }, [mutation.data, setIsLoggedIn])
    return mutation
}



export default useLogin
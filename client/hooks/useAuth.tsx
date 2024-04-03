import { login } from "@/services/auth"
import { UserStore } from "@/store/UserStore"
import API from "@/utils/API"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { URLS } from "@/constants"


type loginPayload = {
    email: string,
    password: string
}

export const useLogin: any = () => {
    const { setIsLoggedIn } = UserStore((state) => state)

    const { mutateAsync: loginMutation, isSuccess, data } = useMutation({
        mutationFn: async (payload: loginPayload) => {
            let { email, password } = payload
            const { data } = await API.post(URLS.AUTH + "/login", { email, password });
            console.log(data)
            return data
        },
        onSuccess: (data: any) => {
            setIsLoggedIn(data)
        }
    })


    



    return { loginMutation, isSuccess }
}




import API from "@/utils/API"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'

// Get QueryClient from the context
type loginPayload = {
    email: string,
    password: string
}


const usePost = (qkey:string) => {
    const queryClient = useQueryClient()

    // const mutations = useMutation({
    //     mutationFn: async (urls: string, payload: any):Promise<any> => {
    //         console.log('mutation')
    //         const { data } = await API.post(urls,  {...payload} );
    //         console.log(data, 'data')
    //         return data


    //     }
    const [error, setError] = useState()
    const { mutate: postMutation, isError, isSuccess, data } = useMutation({

        mutationFn: async (payload: any) => {
            try {
                const { data } = await API.post(payload.urls, { ...payload.payload });
                console.log(data)
                return data;
            }
            catch (error) {
                setError((error as any).response.data.message)
            }

        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [qkey] });
          },

    })
    console.log(data)
    return { postMutation, isError, isSuccess, data, error }
}

export default usePost;



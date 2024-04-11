import React, { useState } from 'react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import usePost from '@/hooks/usePost'
import { otpValidation } from '@/validator/otp.schema'
import { Button } from './ui/button'
import { URLS } from "@/constants";

type user = {
    email: string,
    otp: string,
}
export function Otp({ email }: { email: string }) {

    const { postMutation, data, success, error } = usePost('')
    const [user, setUser] = useState<user>({

        email: email,
        otp: ''
    })
    const handleSubmit = () => {
        let data = user
        postMutation({ urls: URLS.AUTH + '/verify', data })
        console.log(data, 'coppppppppppp')
    }
    const regenHandler = () => {
        console.log('clieckkdsf')
        setUser({ ...user, otp: '' })
        let email = user.email
        let data = { email }

        postMutation({ urls: URLS.AUTH + '/regenerateToken', data })

        console.log(user)
    }
    return (
        <div className='flex-col'>
            <input type="text" readOnly value={email} />
            <InputOTP value={user.otp} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(value) => setUser({ ...user, otp: value })}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button onClick={handleSubmit}>Submit</Button>
            {error && <div className="text-red-500">{error}
                <Button onClick={regenHandler}>regenrate token</Button>
            </div>}

        </div>

    )
}

export default Otp
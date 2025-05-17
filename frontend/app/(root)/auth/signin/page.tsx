import SigninForm from '@/components/signin-form'
import { cookies } from 'next/headers'
import React from 'react'

const Signin = async () => {
  const cookie = (await cookies()).get("_fit_life_gym_auth")?.value
  return (
    <div>
        <SigninForm authCookie={cookie!}/>
    </div>
  )
}

export default Signin
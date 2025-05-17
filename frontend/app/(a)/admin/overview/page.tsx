import ChartOverView from '@/components/admin-overview-page'
import { cookies } from 'next/headers'
import React from 'react'

const OverView = async () => {
  const cookie = (await cookies()).get("_fit_life_gym_auth_admin")?.value
    return (
    <div>
        <ChartOverView authCookie={cookie!}/>
    </div>
  )
}

export default OverView
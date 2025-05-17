import PlanSelectionPage from '@/components/plan-selection-page'
import { cookies } from 'next/headers'
import React from 'react'

const PlanSelection = async () => {

    const cookie = (await cookies()).get("_fit_life_gym_auth")?.value

  return (
    <div>
        <PlanSelectionPage authCookie={cookie!}/>
    </div>
  )
}

export default PlanSelection
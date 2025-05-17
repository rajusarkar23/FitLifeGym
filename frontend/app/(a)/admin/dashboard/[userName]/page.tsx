import { AdminDashboard } from '@/components/admin-dashboard'
import { cookies } from 'next/headers'

const AdminDashboardPage = async () => {

  const cookie = (await cookies()).get("_fit_life_gym_auth_admin")?.value

  return (
    <div>
      <AdminDashboard authCookie={cookie!}/>
    </div>
  )
}

export default AdminDashboardPage
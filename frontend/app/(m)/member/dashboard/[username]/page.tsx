import MemberPage from "@/components/member-page";
import { cookies } from "next/headers";

const Dashboard = async () => {

  const authCookie = (await cookies()).get("_fit_life_gym_auth")?.value

  return (
    <div>
      <MemberPage authCookie={authCookie!}/>
    </div>
  );
};

export default Dashboard;

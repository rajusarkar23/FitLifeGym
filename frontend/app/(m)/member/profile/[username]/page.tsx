import { cookies } from "next/headers";
import ProfilePage from "@/components/profile-page";

const Profile = async () => {
  const cookie = (await cookies()).get("_fit_life_gym_auth")?.value;

  return (
    <div>
      <ProfilePage cookie={cookie!} />
    </div>
  );
};

export default Profile;

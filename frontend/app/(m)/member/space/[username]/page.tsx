import SpacePage from "@/components/space-page";
import { cookies } from "next/headers";

const Space = async () => {
  const cookie = (await cookies()).get("_fit_life_gym_auth")?.value;

  return (
    <div>
      <SpacePage authCookie={cookie!} />
    </div>
  );
};

export default Space;

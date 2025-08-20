import User from "@/models/User";
import { TUserPublic } from "@/types";
import { cookies } from "next/headers";

function isAdmin(options: { getInfos: true }): Promise<TUserPublic>;
function isAdmin(options?: { getInfos: false }): Promise<boolean>;

async function isAdmin(options?: { getInfos: boolean }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token trouvé dans cookie:", token);

  if (!token) return false;

  const user: TUserPublic | null = (await User.findOne({ token }).select(
    "-salt -hash"
  )) as TUserPublic | null;

  console.log("User trouvé:", user);
  console.log(user?.admin);
  console.log(user?.email);

  if (!user || !user.admin) {
    console.log("Pas admin ou pas trouvé");
    return false;
  }

  if (options?.getInfos) return user;
  return true;
}

export default isAdmin;

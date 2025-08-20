import User from "@/models/User";
import { TUserPublic } from "@/types";
import { cookies } from "next/headers";

function isAuthenticated(options: { getInfos: true }): Promise<TUserPublic>;
function isAuthenticated(options?: { getInfos: false }): Promise<boolean>;

async function isAuthenticated(options?: { getInfos: boolean }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;

  const user: TUserPublic | null = (await User.findOne({ token }).select(
    "-salt -hash"
  )) as TUserPublic | null;

  if (!user) return false;

  if (options?.getInfos) return user;
  else return true;
}

export default isAuthenticated;

"use server";

import { cookies } from "next/headers";

const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

export default logout;

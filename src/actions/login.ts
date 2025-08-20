"use server";

import User from "@/models/User";
import { TUserPrivate } from "@/types";
import { SHA256 } from "crypto-js";
import encBase64 from "crypto-js/enc-base64";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const login = async (currentError: string | null, formData: FormData) => {
  let user: TUserPrivate | null = null; // 👈 accessible partout

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Missing parameters");
    }

    user = (await User.findOne({ email })) as TUserPrivate | null;

    if (!user) throw new Error("Unauthorized");

    const newHash = SHA256(password + user.salt).toString(encBase64);

    if (newHash !== user.hash) {
      throw new Error("Unauthorized");
    }

    const cookieStore = await cookies();
    cookieStore.set("token", user.token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 14, // 14 jours
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      switch (error.message) {
        case "Missing parameters":
          return "Veuillez remplir tous les champs";
        case "Unauthorized":
          return "Mauvaise combinaison email / mot de passe";
        default:
          return "Une erreur est survenue";
      }
    } else {
      return "Une erreur est survenue";
    }
  }

  // ici user existe encore ✅
  if (user?.admin) {
    redirect("/admin");
  }
  redirect("/products");
};

export default login;

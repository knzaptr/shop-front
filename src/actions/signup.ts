"use server";

import User from "@/models/User";
import uid2 from "uid2";
import { SHA256 } from "crypto-js";
import encBase64 from "crypto-js/enc-base64";
import { cookies } from "next/headers";
import { TUserPrivate } from "@/types";
import { redirect } from "next/navigation";

const signup = async (currentError: null | string, formData: FormData) => {
  try {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      throw new Error("Missing parameters");
    }

    const emailAlreadyUsedByUser: TUserPrivate | null = await User.findOne({
      email,
    });

    if (emailAlreadyUsedByUser) throw new Error("Email already used");

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    await User.create({
      username,
      email,
      token,
      salt,
      hash,
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      switch (error.message) {
        case "Missing parameters":
          return "Veuillez remplir tous les champs";
        case "Email already used":
          return "Email déjà utilisé";
        default:
          return "Une erreur est survenue";
      }
    } else {
      return "Une erreur est survenue";
    }
  }
  redirect("/products");
};

export default signup;

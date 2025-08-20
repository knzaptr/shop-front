"use server";

import Todo from "@/models/Todo";
import { revalidatePath } from "next/cache";
import isAuthenticated from "@/middlewares/isAuthenticated";

const createTodo = async (currentError: null | string, formData: FormData) => {
  try {
    const title = formData.get("title");
    if (!title) throw new Error("Empty input");

    const user = await isAuthenticated({ getInfos: true });

    if (!user) throw new Error("Unauthorized");

    await Todo.create({
      title: title,
      owner: user._id,
    });
    revalidatePath("/list");
    return null;
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "Empty input":
          return "Veuillez donner un nom à votre nouvelle tâche";
        case "Unauthorized":
          return "Veuillez vous connecter mour créer une tâche";
        default:
          return "Une erreur est survenue";
      }
    } else {
      return "Une erreur est survenue";
    }
  }
};

export default createTodo;

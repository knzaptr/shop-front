"use server";

import Todo from "@/models/Todo";
import { revalidatePath } from "next/cache";
import isOwner from "@/middlewares/isOwner";

const deleteTodo = async (id: string) => {
  const owner = await isOwner(id);
  if (!owner) return;

  await Todo.findByIdAndDelete(id);
  revalidatePath("/list");
};

export default deleteTodo;

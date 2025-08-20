"use server";

import isOwner from "@/middlewares/isOwner";
import Todo from "@/models/Todo";
import { revalidatePath } from "next/cache";

const toggleTodo = async (id: string) => {
  const owner = await isOwner(id);
  if (!owner) return;

  const todo = await Todo.findById(id);
  todo.isDone = !todo.isDone;
  await todo.save();
  revalidatePath("/list");
};

export default toggleTodo;

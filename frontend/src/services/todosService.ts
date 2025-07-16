import api from "@/lib/api";
import { z } from "zod";

const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  priority: z.string(),
  due_date: z.string().nullable(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get("/api/todos/");
  return z.array(TodoSchema).parse(response.data);
};

export const createTodo = async (
  newTodo: Omit<Todo, "id" | "completed">
): Promise<Todo> => {
  const response = await api.post("/api/todos/", newTodo);
  return TodoSchema.parse(response.data);
};

export const updateTodo = async (
  id: number,
  updatedTodo: Partial<Omit<Todo, "id">>
): Promise<Todo> => {
  const response = await api.put(`/api/todos/${id}`, updatedTodo);
  return TodoSchema.parse(response.data);
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};

export const toggleTodo = async (id: number): Promise<Todo> => {
  const response = await api.patch(`/api/todos/${id}/toggle`);
  return TodoSchema.parse(response.data);
};

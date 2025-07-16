import { AddTodoForm } from "@/components/features/todos/AddTodoForm";
import { TodoList } from "@/components/features/todos/TodoList";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddTodoForm />
      </div>
      <TodoList />
    </div>
  );
}

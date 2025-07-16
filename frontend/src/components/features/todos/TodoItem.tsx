"use client";

import { useState } from "react";
import { Todo, deleteTodo, toggleTodo, updateTodo } from "@/services/todosService";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSWRConfig } from "swr";
import { MoreHorizontal } from "lucide-react";
import { DeleteTodoAlert } from "./DeleteTodoAlert";
import { EditTodoModal } from "./EditTodoModal";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { mutate } = useSWRConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = async () => {
    try {
      await toggleTodo(todo.id);
      mutate("/api/todos/");
      toast.success("To-do toggled successfully!");
    } catch (error) {
      toast.error("Failed to toggle to-do.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      mutate("/api/todos/");
      toast.success("To-do deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete to-do.");
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <Checkbox checked={todo.completed} onCheckedChange={handleToggle} />
        <div className="flex-1">
          <span
            className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
          >
            {todo.title}
          </span>
          {todo.due_date && (
            <p className="text-xs text-muted-foreground">
              Due: {new Date(todo.due_date).toLocaleDateString()}
            </p>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{todo.priority}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setIsModalOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setIsAlertOpen(true)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
      <DeleteTodoAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={handleDelete}
      />
      <EditTodoModal
        todo={todo}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </Card>
  );
}

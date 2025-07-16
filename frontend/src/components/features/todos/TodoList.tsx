"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { getTodos, Todo } from "@/services/todosService";
import { TodoItem } from "./TodoItem";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fetcher = (url: string) => getTodos();

export function TodoList() {
  const { data: todos, error } = useSWR("/api/todos/", fetcher);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("due_date");

  const sortedAndFilteredTodos = useMemo(() => {
    if (!todos) return [];

    let filtered = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder: { [key: string]: number } = { High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      if (sortBy === "due_date") {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }
      return 0;
    });
  }, [todos, filter, sortBy]);

  if (error) return <div>Failed to load</div>;
  if (!todos) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="due_date">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {sortedAndFilteredTodos.length > 0 ? (
          sortedAndFilteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            You have no tasks yet. Add one above to get started!
          </div>
        )}
      </div>
    </div>
  );
}

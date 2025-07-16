import React from "react";
import { render, screen } from "@testing-library/react";
import { TodoItem } from "../TodoItem";
import { Todo } from "@/services/todosService";

const mockTodo: Todo = {
  id: 1,
  title: "Test Todo",
  priority: "High",
  due_date: new Date().toISOString(),
  completed: false,
};

describe("TodoItem", () => {
  it("renders the todo item", () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });
});

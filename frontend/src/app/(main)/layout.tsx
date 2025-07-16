"use client";

import { ThemeToggle } from "@/components/features/todos/ThemeToggle";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-secondary text-secondary-foreground p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

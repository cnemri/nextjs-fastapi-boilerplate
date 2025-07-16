import dynamic from "next/dynamic";

const ThemeToggleComponent = dynamic(
  () =>
    import("./ThemeToggle-component").then((mod) => mod.ThemeToggle),
  { ssr: false }
);

export function ThemeToggle() {
  return <ThemeToggleComponent />;
}

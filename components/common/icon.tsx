import { icons, type LucideProps } from "lucide-react";

/** Resolve a lucide icon by name (kebab or Pascal). Falls back to Sparkles. */
export function Icon({ name, ...props }: { name?: string } & LucideProps) {
  const pascal = (name ?? "")
    .split(/[-_ ]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[pascal] ?? icons.Sparkles;
  return <Cmp {...props} />;
}

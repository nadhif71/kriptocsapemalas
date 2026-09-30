import type { Feature, NavItem } from "@/types";

export const siteConfig = {
  name: "Your Brand",
  description: "A clean starting point for your next website.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  features: [
    { title: "Feature one", description: "Describe what this does for your visitor." },
    { title: "Feature two", description: "Describe what this does for your visitor." },
    { title: "Feature three", description: "Describe what this does for your visitor." },
  ] satisfies Feature[],
};

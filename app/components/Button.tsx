import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type Props = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-slate-300 text-ink hover:bg-slate-50",
};

export default function Button({ href, variant = "primary", className, children }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

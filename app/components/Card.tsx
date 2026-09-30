import { cn } from "@/lib/utils";

type Props = { title: string; children: React.ReactNode; className?: string };

export default function Card({ title, children, className }: Props) {
  return (
    <div className={cn("rounded-lg border border-slate-200 p-6", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted">{children}</p>
    </div>
  );
}

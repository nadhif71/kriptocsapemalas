"use client";

export default function ScrollButton({
  target,
  children,
}: {
  target: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-slate-50"
    >
      {children}
    </button>
  );
}
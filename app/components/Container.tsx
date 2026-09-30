import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...props }: Props) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

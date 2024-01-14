import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = {
  variant?: "default" | "max" | "custom";
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function ComponentContainer({
  variant = "default",
  ...props
}: Props) {
  return (
    <>
      <div
        className={cn(
          "px-4 mx-auto pt-[4.25rem]",
          variant == "default" && "max-w-[768px]",
          variant == "max" && "max-w-[1024px]",
          variant == "custom" && props.className
        )}
      >
        {props.children}
      </div>
    </>
  );
}

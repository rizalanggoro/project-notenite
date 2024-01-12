import { cn } from "@/lib/utils";

type Props = {
  variant?: "default" | "max";
  children: React.ReactNode;
};

export default function ComponentContainer({
  children,
  variant = "default",
}: Props) {
  return (
    <>
      <div
        className={cn(
          "px-4 mx-auto pt-[4.25rem]",
          variant == "default" && "max-w-[768px]",
          variant == "max" && "max-w-[1024px]"
        )}
      >
        {children}
      </div>
    </>
  );
}

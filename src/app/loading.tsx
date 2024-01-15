import ComponentContainer from "@/components/container";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <ComponentContainer
        variant="custom"
        className="h-screen w-full flex items-center justify-center max-w-[480px]"
      >
        <Loader2 className="animate-spin w-8 h-8" />
      </ComponentContainer>
    </>
  );
}

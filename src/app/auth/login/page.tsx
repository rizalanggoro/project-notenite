import ComponentContainer from "@/components/container";
import { Metadata } from "next";
import LoginForm from "./form";

export const metadata: Metadata = {
  title: "Autentikasi: Masuk - Notenite",
};

export default function Page() {
  return (
    <>
      <ComponentContainer variant="custom" className="max-w-[480px]">
        <div className="my-8">
          <LoginForm />
        </div>
      </ComponentContainer>
    </>
  );
}

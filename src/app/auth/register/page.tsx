import ComponentContainer from "@/components/container";
import { Metadata } from "next";
import RegisterForm from "./form";

export const metadata: Metadata = {
  title: "Autentikasi: Daftar - Notenite",
};

export default function Page() {
  return (
    <>
      <ComponentContainer variant="custom" className="max-w-[480px]">
        <div className="my-8">
          <RegisterForm />
        </div>
      </ComponentContainer>
    </>
  );
}

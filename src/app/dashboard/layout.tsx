"use client";

import ComponentContainer from "@/components/container";
import { usePathname } from "next/navigation";
import DashboardSidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout(props: Props) {
  const pathname = usePathname();
  const isPagePostCreate = pathname.startsWith("/dashboard/posts/create");

  return (
    <>
      <ComponentContainer variant="max">
        <div className="px-4 max-w-[1024px] mx-auto grid grid-cols-12 gap-4">
          {isPagePostCreate || (
            <div className="col-span-4 hidden md:block">
              <DashboardSidebar />
            </div>
          )}
          <div
            className={
              isPagePostCreate ? "col-span-12" : "col-span-12 md:col-span-8"
            }
          >
            {props.children}
          </div>
        </div>
      </ComponentContainer>
    </>
  );
}

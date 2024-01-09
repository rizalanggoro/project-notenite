"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AtSign, Hash, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export default function DashboardSidebar() {
  const menus: Array<MenuItem> = [
    {
      title: "Summary",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    },
    {
      title: "My account",
      href: "/dashboard/account",
      icon: <AtSign className="w-4 h-4 mr-2" />,
    },
    {
      title: "My posts",
      href: "/dashboard/posts",
      icon: <Hash className="w-4 h-4 mr-2" />,
    },
  ];
  const pathname = usePathname();

  return (
    <>
      <ScrollArea>
        <div className="flex flex-col gap-4 my-8">
          <div className="flex flex-col gap-2">
            {menus.map((item, index) => (
              <Button
                key={"dashboard-sidebar-item-" + index}
                variant={pathname == item.href ? "secondary" : "link"}
                asChild
                className="justify-start"
              >
                <Link href={item.href}>
                  {item.icon}
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
          <div>
            <Button className="w-full" variant={"destructive"}>
              Logout
            </Button>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

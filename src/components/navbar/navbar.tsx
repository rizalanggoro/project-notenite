import { repositorySession } from "@/lib/data/repositories/session";
import Link from "next/link";
import { Button } from "../ui/button";
import ComponentNavbarAccent from "./accent";
import ComponentNavbarToggleTheme from "./toggle-theme";

type MenuItem = {
  title: string;
  href: string;
};

export default async function ComponentNavbar() {
  const menus: Array<MenuItem> = [{ title: "Posts", href: "/posts" }];
  const session = await repositorySession.read();
  if (session) {
    menus.push({
      title: "Dashboard",
      href: "/dashboard",
    });
  }

  return (
    <>
      <ComponentNavbarAccent />
      <div className="border-b h-16 fixed w-full mt-1 bg-background/80 backdrop-blur z-10">
        <div className="h-16 mx-auto max-w-[1024px] px-4 flex items-center justify-between">
          <Button asChild variant={"link"}>
            <Link href={"/"} className="font-semibold">
              Notenite
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            {/* menus */}
            <div>
              {menus.map((item, index) => (
                <Button asChild key={"menu-item-" + index} variant={"link"}>
                  <Link href={item.href} className="hover:underline">
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>

            {/* toggle theme */}
            <ComponentNavbarToggleTheme />
          </div>
        </div>
      </div>
    </>
  );
}

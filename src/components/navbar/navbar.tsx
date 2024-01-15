import { repositorySession } from "@/lib/data/repositories/session";
import { AtSign, Hash, LayoutDashboard, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ComponentNavbarAccent from "./accent";
import ComponentNavbarToggleTheme from "./toggle-theme";

type MenuItem = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

export default async function ComponentNavbar() {
  const menus: Array<MenuItem> = [
    {
      icon: <Hash className="w-4 h-4 mr-2" />,
      title: "Posts",
      href: "/posts",
    },
  ];

  const authenticatedMenus: Array<MenuItem> = [
    {
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
      title: "Ringkasan",
      href: "/dashboard",
    },
    {
      icon: <AtSign className="w-4 h-4 mr-2" />,
      title: "Akun saya",
      href: "/dashboard/account",
    },
    {
      icon: <Hash className="w-4 h-4 mr-2" />,
      title: "Postingan saya",
      href: "/dashboard/posts",
    },
  ];

  const session = await repositorySession.read();

  return (
    <>
      <ComponentNavbarAccent />

      {/* navbar */}
      <div className="border-b h-16 fixed w-full mt-1 bg-background/80 backdrop-blur z-10">
        <div className="h-16 mx-auto max-w-[1024px] px-4 flex items-center justify-between">
          <Button asChild variant={"link"}>
            <Link href={"/"} className="font-semibold">
              Notenite
            </Link>
          </Button>

          <div className="flex items-center gap-2 md:gap-4">
            {/* menus */}
            <div className="hidden md:flex items-center gap-6">
              {menus.map((item, index) => (
                <Button
                  asChild
                  key={"menu-item-" + index}
                  variant={"link"}
                  className="px-0"
                >
                  <Link href={item.href} className="hover:underline">
                    {item.title}
                  </Link>
                </Button>
              ))}

              {/* dashboard menu */}
              {session && (
                <Link key={"menu-item-dashboard"} href={"/dashboard"}>
                  <Button variant={"link"} className="px-0">
                    Dasbor
                  </Button>
                </Link>
              )}
            </div>

            {/* toggle theme */}
            <ComponentNavbarToggleTheme />

            {/* mobile sheet menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="flex md:hidden"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="text-left">
                  <SheetTitle>Notenite</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 my-4">
                  {menus.map((menu, index) => (
                    <SheetClose key={"sm-menu-item-" + index} asChild>
                      <Link href={menu.href} className="w-full">
                        <Button
                          className="w-full justify-start px-0"
                          variant={"link"}
                        >
                          {menu.icon}
                          {menu.title}
                        </Button>
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {session && (
                  <>
                    <Separator orientation="horizontal" className="my-2" />

                    {/* dashboard menus */}
                    <p className="font-semibold my-4">Dasbor</p>
                    <div className="flex flex-col gap-2 my-4">
                      {authenticatedMenus.map((menu, index) => (
                        <SheetClose key={"sm-menu-item-" + index} asChild>
                          <Link href={menu.href} className="w-full">
                            <Button
                              className="w-full justify-start px-0"
                              variant={"link"}
                            >
                              {menu.icon}
                              {menu.title}
                            </Button>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </>
                )}

                {!session && (
                  <>
                    <Separator orientation="horizontal" className="my-2" />

                    {/* dashboard menus */}
                    <p className="my-4 text-muted-foreground">
                      Silahkan masuk atau registrasi untuk dapat mengakses menu
                      dasbor
                    </p>
                    <SheetClose
                      key={"sm-menu-item-login"}
                      className="mb-4"
                      asChild
                    >
                      <Link href={"/auth/login"} className="w-full">
                        <Button
                          className="w-full justify-start px-0"
                          variant={"link"}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Masuk
                        </Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}

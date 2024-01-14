"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnumStateStatus } from "@/lib/core/enums/state-type";
import { JWTPayload } from "jose";
import { Info, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { StateType, useDashboardPosts } from "./store";

type Props = {
  session: JWTPayload;
};

export default function ListPosts(props: Props) {
  const { type, status, posts, readAll } = useDashboardPosts();

  useEffect(() => {
    if (posts.length == 0) readAll(props);
  }, [posts]);

  return (
    <>
      {type == StateType.readAll && status == EnumStateStatus.loading ? (
        <Alert className="mt-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <AlertTitle>Memuat data</AlertTitle>
          <AlertDescription>
            Mengambil daftar postingan Anda dari server
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {" "}
          <Tabs defaultValue="all" className="mt-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="public">Publik</TabsTrigger>
              <TabsTrigger value="private">Privat</TabsTrigger>
            </TabsList>
            {["all", "public", "private"].map((item, index) => (
              <TabsContent value={item} key={"my-post-tab-item-" + index}>
                <div className="flex flex-col gap-2">
                  {(item == "all"
                    ? posts
                    : posts.filter((post) => post.visibility == item)
                  ).map((item, index) => {
                    return (
                      <Card key={"all-post-item-" + index}>
                        <CardHeader className="flex flex-row justify-between">
                          <div className="space-y-1.5">
                            <Badge
                              className="w-fit uppercase mb-2"
                              variant={"secondary"}
                            >
                              {item.visibility}
                            </Badge>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>
                              {item.description}
                            </CardDescription>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size={"icon"} variant={"outline"}>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Opsi</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Pencil className="w-4 h-4 mr-2" />
                                Ubah konten
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Info className="w-4 h-4 mr-2" />
                                Ubah informasi
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus postingan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </>
  );
}

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import ModelPost from "@/lib/data/models/post";
import { JWTPayload } from "jose";
import { Info, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StateType, useStoreDashboardPosts } from "./store";

type Props = {
  session: JWTPayload;
};

export default function ListPosts(props: Props) {
  const { type, status, posts, readAll, deletePost } = useStoreDashboardPosts();
  const [isDialogOptionVisible, setIsDialogOptionVisible] = useState(false);
  const [dialogOptionData, setDialogOptionData] = useState<{
    type: "update" | "delete";
    post: ModelPost;
    index: number;
  }>();

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
          <Dialog
            open={isDialogOptionVisible}
            onOpenChange={(value) => setIsDialogOptionVisible(value)}
          >
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
                            <div className="space-y-1.5 flex-1">
                              <Badge
                                className="w-fit uppercase mb-2"
                                variant={"secondary"}
                              >
                                {item.visibility}
                              </Badge>
                              <CardTitle className="leading-normal">
                                {item.title}
                              </CardTitle>
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
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={"/dashboard/posts/create/" + item.key}
                                  >
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Ubah konten
                                  </Link>
                                </DropdownMenuItem>
                                <div>
                                  <DialogTrigger
                                    className="w-full"
                                    onClick={() => {
                                      setDialogOptionData({
                                        type: "update",
                                        post: item,
                                        index,
                                      });
                                    }}
                                  >
                                    <DropdownMenuItem>
                                      <Info className="w-4 h-4 mr-2" />
                                      Ubah informasi
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                </div>
                                <div>
                                  <DialogTrigger
                                    className="w-full"
                                    onClick={() => {
                                      setDialogOptionData({
                                        type: "delete",
                                        post: item,
                                        index,
                                      });
                                    }}
                                  >
                                    <DropdownMenuItem>
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Hapus postingan
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                </div>
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

            <DialogContent className="max-w-[480px]">
              <DialogHeader>
                <DialogTitle>
                  {dialogOptionData?.type == "update"
                    ? "Ubah informasi"
                    : "Hapus postingan"}
                </DialogTitle>
                <DialogDescription>
                  {dialogOptionData?.type == "update"
                    ? "Berikan informasi yang sesuai dengan postingan yang Anda buat sebelum mempublikasikannya"
                    : `Apakah Anda yakin akan menghapus postingan dengan judul "${dialogOptionData?.post.title}" secara permanen? Tindakan Anda tidak dapat dipulihkan`}
                </DialogDescription>
              </DialogHeader>

              <div></div>

              <DialogFooter>
                <Button
                  variant={"secondary"}
                  disabled={
                    type == StateType.deletePost &&
                    status == EnumStateStatus.loading
                  }
                >
                  Batal
                </Button>
                {dialogOptionData?.type == "update" ? (
                  <Button>Simpan</Button>
                ) : (
                  <Button
                    variant={"destructive"}
                    onClick={async () => {
                      const postKey = dialogOptionData?.post.key;
                      if (postKey) {
                        const res = await deletePost({ key: postKey });
                        if (res) setIsDialogOptionVisible(false);
                      }
                    }}
                    disabled={
                      type == StateType.deletePost &&
                      status == EnumStateStatus.loading
                    }
                  >
                    {type == StateType.deletePost &&
                      status == EnumStateStatus.loading && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                    Hapus
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { EnumStateStatus } from "@/lib/core/enums/state-type";
import ModelPost from "@/lib/data/models/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { JWTPayload } from "jose";
import { Info, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import * as z from "zod";
import { StateType, useStoreDashboardPosts } from "./store";

const updateInfoScheme = z.object({
  title: z
    .string()
    .min(1, { message: "Judul tidak boleh kosong!" })
    .max(60, { message: "Judul tidak boleh lebih dari 60 karakter!" }),
  description: z
    .string()
    .min(1, { message: "Deskripsi tidak boleh kosong!" })
    .max(256, { message: "Deskripsi tidak boleh lebih dari 256 karakter!" }),
  visibility: z.enum(["private", "public"], {}),
});

type Props = {
  session: JWTPayload;
};

interface DialogOptionData {
  type: "update" | "delete";
  post: ModelPost;
}

export default function ListPosts(props: Props) {
  const { type, status, posts, deletePost } = useStoreDashboardPosts();
  const [isDialogOptionVisible, setIsDialogOptionVisible] = useState(false);
  const [dialogOptionData, setDialogOptionData] = useState<DialogOptionData>();

  const updateInfoForm = useForm<z.infer<typeof updateInfoScheme>>({
    resolver: zodResolver(updateInfoScheme),
    defaultValues: {
      title: "coba",
      description: "ini desc",
      visibility: "private",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof updateInfoScheme>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  useEffect(() => {
    if (dialogOptionData) {
      updateInfoForm.setValue("title", dialogOptionData.post.title ?? "");
      updateInfoForm.setValue(
        "description",
        dialogOptionData.post.description ?? ""
      );
      updateInfoForm.setValue(
        "visibility",
        dialogOptionData.post.visibility ?? "private"
      );
    }
  }, [dialogOptionData]);

  return (
    <>
      {type == StateType.readAll && status == EnumStateStatus.loading ? (
        <LoadingContainer />
      ) : (
        <>
          <Dialog
            open={isDialogOptionVisible}
            onOpenChange={(value) => setIsDialogOptionVisible(value)}
          >
            <TabAndListPosts
              session={props.session}
              setDialogOptionData={setDialogOptionData}
            />

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

              {/* form update info */}
              <Form {...updateInfoForm}>
                <form
                  onSubmit={updateInfoForm.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {dialogOptionData?.type == "update" && (
                    <>
                      <FormField
                        control={updateInfoForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Judul</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Slug:{" "}
                              {slugify(updateInfoForm.watch("title"), {
                                lower: true,
                              })}
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateInfoForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="resize-none min-h-32"
                              ></Textarea>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={updateInfoForm.control}
                        name="visibility"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Visibilitas</FormLabel>
                            <FormControl>
                              <Select
                                disabled={field.disabled}
                                name={field.name}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="private">
                                    Privat
                                  </SelectItem>
                                  <SelectItem value="public">Publik</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <DialogFooter className="sm:space-x-0 gap-2">
                    {dialogOptionData?.type == "update" ? (
                      <Button type="submit">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Simpan
                      </Button>
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
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

const TabAndListPosts = (props: {
  session: JWTPayload;
  setDialogOptionData: Dispatch<SetStateAction<DialogOptionData | undefined>>;
}) => {
  const { posts, readAll } = useStoreDashboardPosts();

  useEffect(() => {
    if (posts.length == 0) readAll({ session: props.session });
  }, [posts]);

  return (
    <>
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
                        <CardDescription>{item.description}</CardDescription>
                      </div>

                      <DropdownOptions
                        post={item}
                        setDialogOptionData={props.setDialogOptionData}
                      />
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

const DropdownOptions = (props: {
  post: ModelPost;
  setDialogOptionData: Dispatch<SetStateAction<DialogOptionData | undefined>>;
}) => {
  return (
    <>
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
            <Link href={"/dashboard/posts/create/" + props.post.key}>
              <Pencil className="w-4 h-4 mr-2" />
              Ubah konten
            </Link>
          </DropdownMenuItem>
          <div>
            <DialogTrigger
              className="w-full"
              onClick={() => {
                props.setDialogOptionData({
                  type: "update",
                  post: props.post,
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
                props.setDialogOptionData({
                  type: "delete",
                  post: props.post,
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
    </>
  );
};

const LoadingContainer = () => {
  return (
    <>
      <Alert className="mt-4">
        <Loader2 className="w-4 h-4 animate-spin" />
        <AlertTitle>Memuat data</AlertTitle>
        <AlertDescription>
          Mengambil daftar postingan Anda dari server
        </AlertDescription>
      </Alert>
    </>
  );
};

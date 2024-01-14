"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { EnumStateStatus } from "@/lib/core/enums/state-type";
import { useAppDispatch, useAppSelector } from "@/lib/core/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { either } from "fp-ts";
import { JWTPayload } from "jose";
import { Loader2, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as slice from "./slice";
import { useDashboardPosts } from "./store";

type Props = {
  session: JWTPayload;
};

const schema = z.object({
  title: z
    .string({ required_error: "Judul diperlukan!" })
    .min(1, { message: "Judul tidak boleh kosong!" }),
  description: z
    .string({ required_error: "Deskripsi diperlukan!" })
    .min(1, { message: "Deskripsi tidak boleh kosong!" }),
});

export default function CreateNewPost(props: Props) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const userKey = props.session.key;
    if (userKey) {
      const res = await dispatch(
        slice.actions.createPost({
          ...values,
          userKey: userKey as string,
        })
      );
      if (either.isRight(res.payload as any)) {
        dispatch(slice.actions.resetState());
        form.reset();
      }
    }
  };

  // const isDialogCreatePostShowed = useAppSelector(
  //   (state) => state.dashboardPosts.isDialogCreatePostShowed
  // );
  const isTypeCreatePost = useAppSelector(
    (state) => state.dashboardPosts.type == slice.StateType.createPost
  );
  const status = useAppSelector((state) => state.dashboardPosts.status);

  const isDialogCreatePostVisible = useDashboardPosts(
    (state) => state.isDialogCreatePostVisible
  );

  // listen state changes
  useEffect(() => {
    if (isTypeCreatePost) {
      if (
        status == EnumStateStatus.success ||
        status == EnumStateStatus.failure
      ) {
        const isSuccess = status == EnumStateStatus.success;
        toast({
          title: isSuccess
            ? "Berhasil membuat postingan!"
            : "Gagal membuat postingan!",
          duration: 3000,
          variant: isSuccess ? "default" : "destructive",
        });
      }
    }
  }, [isTypeCreatePost, status]);

  return (
    <>
      <Dialog
        open={isDialogCreatePostVisible}
        onOpenChange={(e) =>
          useDashboardPosts.setState({ isDialogCreatePostVisible: e })
        }
      >
        <DialogTrigger asChild>
          <Button size={"sm"}>
            <Plus className="w-4 h-4 mr-2" />
            Buat
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Buat postingan baru</DialogTitle>
            <DialogDescription>
              Silahkan isi beberapa informasi berikut untuk membuat sebuah
              postingan baru. Postingan baru akan tersedia dalam akses privat.
              Anda dapat mengubah akses tersebut kapan saja
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={isTypeCreatePost && status == EnumStateStatus.loading}
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isTypeCreatePost && status == EnumStateStatus.loading}
                control={form.control}
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

              <DialogFooter>
                <DialogClose
                  asChild
                  disabled={
                    isTypeCreatePost && status == EnumStateStatus.loading
                  }
                >
                  <Button variant={"secondary"}>Batal</Button>
                </DialogClose>
                <Button
                  disabled={
                    isTypeCreatePost && status == EnumStateStatus.loading
                  }
                  type="submit"
                >
                  {isTypeCreatePost && status == EnumStateStatus.loading && (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  )}
                  Selesai
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

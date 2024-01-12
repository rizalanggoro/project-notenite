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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { StateStatus } from "@/lib/core/types/state-status";
import ModelPost from "@/lib/data/models/post";
import { JWTPayload } from "jose";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  session: JWTPayload;
};

type State = {
  status: StateStatus;
  message: string;
  dialogCreatePostOpen: boolean;
};

export default function CreateNewPost(props: Props) {
  const { toast } = useToast();

  const [state, setState] = useState<State>({
    status: "initial",
    message: "",
    dialogCreatePostOpen: false,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const createPost = async () => {
    setState({ ...state, status: "loading" });

    if (form.title.trim().length == 0)
      return setState({
        ...state,
        status: "failure",
        message: "Judul postingan tidak boleh kosong!",
      });

    if (form.description.trim().length == 0)
      return setState({
        ...state,
        status: "failure",
        message: "Deskripsi postingan tidak boleh kosong!",
      });

    const currentDate = new Date().getTime();

    const response = await fetch("/api/dashboard/posts/create", {
      method: "POST",
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        userKey: props.session.key,
        createdAt: currentDate,
        updatedAt: currentDate,
        visibility: "private",
      } as ModelPost),
    });

    if (response.ok) {
      return setState({
        ...state,
        status: "success",
        dialogCreatePostOpen: false,
      });
    } else {
      return setState({
        ...state,
        status: "failure",
        message: "Terdapat kesalahan pada server! Silahkan coba lagi nanti",
      });
    }
  };

  // listen state changes
  useEffect(() => {
    if (state.status == "failure")
      toast({
        title: "Terjadi kesalahan!",
        description: state.message,
        variant: "destructive",
        duration: 3000,
      });
    else if (state.status == "success") {
      toast({
        title: "Berhasil!",
        duration: 3000,
      });
    }
  }, [state]);

  return (
    <>
      <Dialog
        open={state.dialogCreatePostOpen}
        onOpenChange={(e) => setState({ ...state, dialogCreatePostOpen: e })}
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

          <div className="flex flex-col gap-2">
            <div>
              <Label htmlFor="create-post-input-title">Judul</Label>
              <Input
                id="create-post-input-title"
                className="mt-2"
                disabled={state.status == "loading"}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="create-post-input-description">Deskripsi</Label>
              <Textarea
                id="create-post-input-description"
                className="mt-2 resize-none min-h-32"
                disabled={state.status == "loading"}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></Textarea>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild disabled={state.status == "loading"}>
              <Button variant={"secondary"}>Batal</Button>
            </DialogClose>
            <Button
              disabled={state.status == "loading"}
              onClick={() => createPost()}
            >
              {state.status == "loading" && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

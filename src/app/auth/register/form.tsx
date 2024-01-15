"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { StateStatus } from "@/lib/core/types/state-status";
import { zodResolver } from "@hookform/resolvers/zod";
import { either } from "fp-ts";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { register } from "./actions";

const schema = z
  .object({
    name: z
      .string({ required_error: "Nama lengkap diperlukan!" })
      .min(1, { message: "Nama lengkap tidak boleh kosong!" }),
    email: z
      .string({ required_error: "Alamat email diperlukan!" })
      .toLowerCase()
      .min(1, { message: "Alamat email tidak boleh kosong!" })
      .email({ message: "Alamat email tidak valid!" }),
    password: z
      .string({ required_error: "Kata sandi diperlukan!" })
      .toLowerCase()
      .min(6, { message: "Kata sandi minimal terdiri dari 6 karakter!" }),
    confirmPassword: z
      .string({ required_error: "Kata sandi diperlukan!" })
      .toLowerCase()
      .min(6, { message: "Kata sandi minimal terdiri dari 6 karakter!" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok!",
    path: ["confirmPassword"],
  });

interface State {
  status: StateStatus;
  message: string;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
}

export default function RegisterForm() {
  const [state, setState] = useState<State>({
    status: "initial",
    message: "",
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Rizal Anggoro",
      email: "rizaldwianggoro2@student.uns.ac.id",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setState({ ...state, status: "loading" });

    const res = await register({ ...values });

    if (either.isLeft(res)) {
      return setState({
        ...state,
        status: "failure",
        message: res.left.message ?? "",
      });
    } else {
      setTimeout(() => router.replace("/dashboard"), 1500);
      return setState({
        ...state,
        status: "success",
        message: "Anda akan segera dialihkan ke halaman dasbor",
      });
    }
  };

  useEffect(() => {
    const status = state.status;
    if (status == "success" || status == "failure") {
      toast({
        title: status == "success" ? "Berhasil mendaftar!" : "Gagal mendaftar!",
        description: state.message,
        duration: 3000,
        variant: status == "success" ? "default" : "destructive",
      });
    }
  }, [state.status]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Autentikasi</CardTitle>
              <CardDescription>
                Lengkapi beberapa informasi berikut untuk melakukan pendaftaran
                akun baru Notenite
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                disabled={state.status == "loading"}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={state.status == "loading"}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={state.status == "loading"}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata sandi</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          type={state.isPasswordVisible ? "text" : "password"}
                          className="flex-1"
                        />
                        <Toggle
                          pressed={state.isPasswordVisible}
                          onPressedChange={(value) =>
                            setState({ ...state, isPasswordVisible: value })
                          }
                        >
                          {state.isPasswordVisible ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Toggle>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={state.status == "loading"}
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi kata sandi</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          {...field}
                          type={
                            state.isConfirmPasswordVisible ? "text" : "password"
                          }
                          className="flex-1"
                        />
                        <Toggle
                          pressed={state.isConfirmPasswordVisible}
                          onPressedChange={(value) =>
                            setState({
                              ...state,
                              isConfirmPasswordVisible: value,
                            })
                          }
                        >
                          {state.isConfirmPasswordVisible ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Toggle>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col justify-center gap-4">
              <Button
                disabled={state.status == "loading"}
                className="w-full"
                type="submit"
              >
                {state.status == "loading" && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Daftar
              </Button>
              <Button
                disabled={state.status == "loading"}
                variant={"link"}
                asChild
                className="whitespace-normal text-center"
              >
                <Link href={"/auth/login"}>
                  Sudah punya akun Notenite? Masuk sekarang juga
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}

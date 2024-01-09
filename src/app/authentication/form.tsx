"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FailureMessages } from "@/lib/core/failure";
import { StateStatus } from "@/lib/core/types/state-status";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { ChangeEvent, useState } from "react";

type State = {
  status: StateStatus;
  message: string;
  isLogin: boolean;
  passwordVisibility: boolean;
  confirmPasswordVisibility: boolean;
};

export default function AuthenticationForm() {
  const [state, setState] = useState<State>({
    status: "initial",
    message: "",
    isLogin: true,
    passwordVisibility: false,
    confirmPasswordVisibility: false,
  });

  const [form, setForm] = useState({
    name: "Rizal Anggoro",
    email: "rizaldwianggoro@student.uns.ac.id",
    password: "12345678",
    confirmPassword: "12345678",
  });

  const { toast, dismiss } = useToast();

  const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "name")
      setForm({ ...form, name: event.target.value });
    if (event.target.name === "email")
      setForm({ ...form, email: event.target.value });
    if (event.target.name === "password")
      setForm({ ...form, password: event.target.value });
    if (event.target.name === "confirmPassword")
      setForm({ ...form, confirmPassword: event.target.value });
  };

  const onClickButtonSubmit = async () => {
    setState({ ...state, status: "loading" });

    const response = await fetch(
      state.isLogin
        ? "/api/authentication/login"
        : "/api/authentication/register",
      {
        method: "POST",
        body: JSON.stringify({ ...form }),
      }
    );

    if (response.ok) {
      setState({ ...state, status: "success" });
      toast({
        variant: "default",
        title: "Success",
      });
    } else {
      setState({ ...state, status: "failure" });
      toast({
        variant: "destructive",
        title: "Error",
        description: FailureMessages.Authentication[response.status],
      });
    }
  };

  return (
    <>
      <Card className="my-8">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {state.isLogin || (
            <div>
              <Label htmlFor="input-name">Full name</Label>
              <Input
                name="name"
                id="input-name"
                placeholder="Rizal Anggoro"
                className="mt-1"
                value={form.name}
                onChange={handleFormInputChange}
                disabled={state.status == "loading"}
              />
            </div>
          )}
          <div>
            <Label htmlFor="input-email">Email address</Label>
            <Input
              name="email"
              id="input-email"
              placeholder="example@email.com"
              className="mt-1"
              value={form.email}
              onChange={handleFormInputChange}
              disabled={state.status == "loading"}
            />
          </div>
          <div>
            <Label htmlFor="input-password">Password</Label>
            <div className="flex gap-2 mt-1">
              <Input
                name="password"
                id="input-password"
                placeholder="••••••••"
                className="flex-1"
                type={state.passwordVisibility ? "text" : "password"}
                value={form.password}
                onChange={handleFormInputChange}
                disabled={state.status == "loading"}
              />
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => {
                  setState({
                    ...state,
                    passwordVisibility: !state.passwordVisibility,
                  });
                }}
                disabled={state.status == "loading"}
              >
                {state.passwordVisibility ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          {state.isLogin || (
            <div>
              <Label htmlFor="input-confirm-password">Confirm password</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  name="confirmPassword"
                  id="input-confirm-password"
                  placeholder="••••••••"
                  type={state.confirmPasswordVisibility ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleFormInputChange}
                  className="flex-1"
                  disabled={state.status == "loading"}
                />
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  onClick={() => {
                    setState({
                      ...state,
                      confirmPasswordVisibility:
                        !state.confirmPasswordVisibility,
                    });
                  }}
                  disabled={state.status == "loading"}
                >
                  {state.confirmPasswordVisibility ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={onClickButtonSubmit}
            disabled={state.status == "loading"}
          >
            {state.status == "loading" && (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            )}
            {state.isLogin ? "Login" : "Register"}
          </Button>
          <Button
            variant={"link"}
            onClick={() =>
              setState({
                ...state,
                isLogin: !state.isLogin,
              })
            }
            disabled={state.status == "loading"}
          >
            {state.isLogin
              ? "Don't have an account yet? Register now"
              : "Already have an account? Sign in now"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

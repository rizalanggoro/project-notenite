"use client";

import { StateStatus } from "@/lib/core/types/state-status";
import { Loader2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type State = {
  status: StateStatus;
  isDarkMode: boolean;
};

export default function ComponentNavbarToggleTheme() {
  const [state, setState] = useState<State>({
    isDarkMode: false,
    status: "initial",
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setState({
      ...state,
      isDarkMode: theme == "dark",
      status: "success",
    });
  }, [theme]);

  return (
    <>
      <Button
        disabled={state.status != "success"}
        size={"icon"}
        variant={"ghost"}
        onClick={() => setTheme(state.isDarkMode ? "light" : "dark")}
      >
        {state.status == "success" ? (
          state.isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </Button>
    </>
  );
}

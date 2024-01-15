"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <Input className="flex-1" />
        <Button variant={"secondary"}>
          <Search className="w-4 h-4 mr-2" />
          Cari
        </Button>
      </div>
    </>
  );
}

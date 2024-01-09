import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="my-8">
        <div className="flex items-center justify-between">
          <p className="font-bold text-3xl">My Posts</p>
          <Button asChild>
            <Link href={"/dashboard/posts/create"}>
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="public">Change your password here.</TabsContent>
          <TabsContent value="private">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
}

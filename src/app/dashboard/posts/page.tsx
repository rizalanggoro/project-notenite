import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { repositorySession } from "@/lib/data/repositories/session";
import { redirect } from "next/navigation";
import CreateNewPost from "./create-new-post";
import ListAllPosts from "./list-all-post";

export default async function Page() {
  const session = await repositorySession.read();

  if (!session) return redirect("/authentication");

  return (
    <>
      <div className="my-8">
        <div className="flex items-center justify-between">
          <p className="font-bold text-3xl">My Posts</p>
          <CreateNewPost session={session} />
        </div>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ListAllPosts session={session} />
          </TabsContent>
          <TabsContent value="public">Change your password here.</TabsContent>
          <TabsContent value="private">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
}

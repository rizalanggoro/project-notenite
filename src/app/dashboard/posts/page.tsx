import { repositorySession } from "@/lib/data/repositories/session";
import { redirect } from "next/navigation";
import CreateNewPost from "./create-new-post";
import ListPosts from "./list-posts";

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

        <ListPosts session={session} />
      </div>
    </>
  );
}

import ModelPost from "@/lib/data/models/post";
import { providerDeta } from "@/lib/data/providers/deta";
import { notFound } from "next/navigation";
import DashboardPostCreateEditor from "./editor";

type Props = {
  params: { key: string };
};
export default async function Page({ params }: Props) {
  const response = await providerDeta.get({
    basename: "post",
    key: params.key,
  });

  if (!response.ok) return notFound();

  const post = (await response.json()) as ModelPost;

  return (
    <>
      <div className="my-8">
        <p className="font-bold text-3xl">Create a new post</p>
        <p className="mt-2">
          Let's write something usefull and share with everyone around the
          world!
        </p>
        <div className="mt-8">
          <DashboardPostCreateEditor post={post} />
        </div>
      </div>
    </>
  );
}

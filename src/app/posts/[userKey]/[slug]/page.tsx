import ComponentContainer from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { ConfigTiptap } from "@/lib/core/configs/tiptap";
import { generateHTML } from "@tiptap/html";
import { either } from "fp-ts";
import { notFound } from "next/navigation";
import * as serverActions from "./actions";
import Content from "./content";

interface Props {
  params: {
    userKey: string;
    slug: string;
  };
}

interface ContentItem {
  type: string;
  content: Array<{ type: string }>;
}

export default async function Page(props: Props) {
  const res = await serverActions.readPost({
    ...props.params,
  });

  if (either.isLeft(res)) return notFound();
  const post = res.right;
  const content = post.content;

  if (!content) return <></>;

  console.log(content);

  const contentHTML = generateHTML(
    JSON.parse(content),
    ConfigTiptap.extensions
  );

  return (
    <>
      <ComponentContainer>
        {/* header */}
        <div className="my-8">
          <p className="text-3xl font-semibold">{post.title}</p>
          <p className="text-muted-foreground mt-2">{post.description}</p>
        </div>

        <Separator orientation="horizontal" className="my-8" />

        <Content contentHTML={contentHTML} />
      </ComponentContainer>
    </>
  );
}

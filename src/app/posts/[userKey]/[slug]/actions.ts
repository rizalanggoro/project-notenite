import Failure from "@/lib/core/failure";
import ModelPost from "@/lib/data/models/post";
import { providerDeta } from "@/lib/data/providers/deta";
import { either } from "fp-ts";

const failureServer: Failure = {
  message: "Terjadi kesalahan tak terduga pada server!",
};

interface ReadPostProps {
  userKey: string;
  slug: string;
}
export const readPost = async (
  props: ReadPostProps
): Promise<either.Either<Failure, ModelPost>> => {
  const queryRes = await providerDeta.query({
    basename: "post",
    payload: {
      query: [{ userKey: props.userKey, key: props.slug }],
      limit: 1,
    },
  });

  if (!queryRes.ok) return either.left(failureServer);

  const { items } = (await queryRes.json()) as { items: Array<ModelPost> };
  const post = items.at(0);

  if (post) return either.right(post);

  return either.left({ message: "Postingan tidak ditemukan!" });
};

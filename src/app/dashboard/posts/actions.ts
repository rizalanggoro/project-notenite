"use server";

import Failure from "@/lib/core/failure";
import ModelPost from "@/lib/data/models/post";
import { providerDeta } from "@/lib/data/providers/deta";
import { either } from "fp-ts";
import { JWTPayload } from "jose";

const failureServer: Failure = {
  message: "Terjadi kesalahan tak terduga pada server",
};

interface ReadAllProps {
  session: JWTPayload;
}
export const readAll = async (
  props: ReadAllProps
): Promise<either.Either<Failure, Array<ModelPost>>> => {
  const queryRes = await providerDeta.query({
    basename: "post",
    payload: { query: [{ userKey: props.session.key }] },
  });

  if (!queryRes.ok) return either.left(failureServer);

  const { items } = await queryRes.json();
  return either.right(items);
};

interface CreatePostProps {
  title: string;
  description: string;
  userKey: string;
}
export const createPost = async (
  props: CreatePostProps
): Promise<either.Either<Failure, ModelPost>> => {
  const currentTime = new Date().getTime();
  const newPost: ModelPost = {
    key: `${currentTime}`,
    userKey: props.userKey,
    title: props.title,
    description: props.description,
    createdAt: currentTime,
    updatedAt: currentTime,
    visibility: "private",
  };

  const insertRes = await providerDeta.insert({
    basename: "post",
    payload: {
      item: newPost,
    },
  });

  if (!insertRes.ok) return either.left(failureServer);

  return either.right(newPost);
};

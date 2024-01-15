"use server";

import Failure from "@/lib/core/failure";
import ModelPost from "@/lib/data/models/post";
import { providerDeta } from "@/lib/data/providers/deta";
import { either } from "fp-ts";

const failureServer: Failure = {
  message: "Terjadi kesalahan tak terduga pada server!",
};

export const readAll = async (): Promise<
  either.Either<Failure, Array<ModelPost>>
> => {
  const queryRes = await providerDeta.query({
    basename: "post",
    payload: {
      query: [{ visibility: "public" }],
      sort: "desc",
    },
  });

  if (!queryRes.ok) return either.left(failureServer);
  const { items } = await queryRes.json();

  return either.right(items);
};

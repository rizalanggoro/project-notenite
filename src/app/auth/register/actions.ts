"use server";

import Failure from "@/lib/core/failure";
import ModelUser from "@/lib/data/models/user";
import { providerDeta } from "@/lib/data/providers/deta";
import { repositorySession } from "@/lib/data/repositories/session";
import { hash } from "bcrypt";
import { either } from "fp-ts";

const failureServer: Failure = {
  message: "Terjadi kesalahan tak terduga pada server!",
};

interface Props {
  name: string;
  email: string;
  password: string;
}
export const register = async (
  props: Props
): Promise<either.Either<Failure, void>> => {
  console.log({ props });
  // check email availability
  const queryRes = await providerDeta.query({
    basename: "user",
    payload: { query: [{ email: props.email }] },
  });

  if (!queryRes.ok) return either.left(failureServer);

  const queryJson = await queryRes.json();
  if (queryJson.paging.size > 0)
    return either.left({
      message:
        "Akun lain telah terdaftar dengan alamat email ini! Silahkan coba masuk",
    });

  // create a new user
  // - hashing password
  const hashedPassword = await hash(props.password, 10);

  // - create new model
  const currentDate = new Date().getTime();
  const newUser: ModelUser = {
    name: props.name,
    email: props.email,
    password: hashedPassword,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  // - insert new user
  const insertRes = await providerDeta.insert({
    basename: "user",
    payload: { item: newUser },
  });

  if (!insertRes.ok) return either.left(failureServer);

  // success
  // - save session
  await repositorySession.create({
    payload: { ...newUser },
  });

  return either.right(undefined);
};

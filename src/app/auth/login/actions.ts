"use server";

import Failure from "@/lib/core/failure";
import ModelUser from "@/lib/data/models/user";
import { providerDeta } from "@/lib/data/providers/deta";
import { repositorySession } from "@/lib/data/repositories/session";
import { compare } from "bcrypt";
import { either } from "fp-ts";

const failureServer: Failure = {
  message: "Terjadi kesalahan tak terduga pada server!",
};

interface Props {
  email: string;
  password: string;
}
export const login = async (
  props: Props
): Promise<either.Either<Failure, void>> => {
  const queryRes = await providerDeta.query({
    basename: "user",
    payload: {
      query: [{ email: props.email }],
    },
  });

  if (!queryRes.ok) return either.left(failureServer);

  const { items } = (await queryRes.json()) as { items: Array<ModelUser> };
  if (items.length == 0)
    return either.left({
      message: "Akun pengguna tidak ditemukan pada database!",
    });

  const user = items.at(0);
  if (!user) return either.left(failureServer);

  if (!user.password) return either.left(failureServer);
  const compareRes = await compare(props.password, user.password);
  if (!compareRes)
    return either.left({
      message: "Alamat email atau kata sandi tidak valid!",
    });

  // success
  // save session
  await repositorySession.create({
    payload: { ...user },
  });

  return either.right(undefined);
};

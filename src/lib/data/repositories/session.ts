import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET ?? "";
const alg = "HS256";
const authSessionKey = "auth-session";

const getSecret = (): Uint8Array => {
  return new TextEncoder().encode(jwtSecret);
};

type SessionCreateProps = {
  payload: JWTPayload;
};
const create = async (props: SessionCreateProps): Promise<void> => {
  const result = await new SignJWT(props.payload)
    .setProtectedHeader({ alg })
    .sign(getSecret());
  cookies().set(authSessionKey, result);
};

const read = async (): Promise<JWTPayload | undefined> => {
  try {
    const authSession = cookies().get(authSessionKey);
    if (authSession) {
      const authSessionValue = authSession.value;

      // verify
      const { payload } = await jwtVerify(authSessionValue, getSecret());
      return payload;
    }

    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const repositorySession = { create, read };

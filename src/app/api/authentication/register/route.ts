import Failure, { FailureTypes } from "@/lib/core/failure";
import { providerDeta } from "@/lib/data/providers/deta";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // check email availability
    const queryResponse = await providerDeta.query({
      basename: "user",
      payload: {
        query: [{ email }],
      },
    });
    if (!queryResponse.ok) throw { code: FailureTypes.Server } as Failure;
    const queryJson = await queryResponse.json();
    if ((queryJson.items as Array<any>).length > 0)
      throw {
        code: FailureTypes.Authentication.EmailAlreadyRegistered,
      } as Failure;

    // create a new user
    const currentDate = new Date().getTime();
    const newUser = {
      name,
      email,
      password,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    const insertResponse = await providerDeta.insert({
      basename: "user",
      payload: {
        item: newUser,
      },
    });
    if (!insertResponse.ok) throw { code: FailureTypes.Server } as Failure;

    return new Response("OK");
  } catch (e) {
    return new Response(undefined, {
      status: (e as Failure).code,
    });
  }
}

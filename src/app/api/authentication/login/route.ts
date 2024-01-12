import Failure, { FailureTypes } from "@/lib/core/failure";
import { providerDeta } from "@/lib/data/providers/deta";
import { repositorySession } from "@/lib/data/repositories/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // check email availability
    const queryResponse = await providerDeta.query({
      basename: "user",
      payload: {
        query: [{ email }],
        limit: 1,
      },
    });
    if (!queryResponse.ok) throw { code: FailureTypes.Server } as Failure;
    const { items }: { items: Array<any> } = await queryResponse.json();
    if (items.length == 0)
      throw {
        code: FailureTypes.Authentication.InvalidEmailOrPassword,
      } as Failure;

    // validate password
    const user = items[0];
    if (
      (password as string).toLowerCase() !=
      (user.password as string).toLowerCase()
    )
      throw {
        code: FailureTypes.Authentication.InvalidEmailOrPassword,
      } as Failure;

    // success
    await repositorySession.create({
      payload: {
        ...user,
        password: undefined,
      },
    });

    return new Response("OK");
  } catch (e) {
    return new Response(undefined, {
      status: (e as Failure).code,
    });
  }
}

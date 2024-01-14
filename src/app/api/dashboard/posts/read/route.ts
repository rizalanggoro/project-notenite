import Failure, { FailureTypes } from "@/lib/core/failure";
import { repositoryPost } from "@/lib/data/repositories/post";

export async function POST(request: Request) {
  try {
    const { userKey, last } = await request.json();
    const readResponse = await repositoryPost.read({
      userKey,
      last,
    });

    if (!readResponse.ok) throw { code: FailureTypes.Server } as Failure;
    const { items } = await readResponse.json();

    return new Response(JSON.stringify(items));
  } catch (e) {
    return new Response(undefined, {
      status: (e as Failure).code,
    });
  }
}

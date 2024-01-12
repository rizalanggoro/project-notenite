import Failure, { FailureTypes } from "@/lib/core/failure";
import ModelPost from "@/lib/data/models/post";
import { repositoryPost } from "@/lib/data/repositories/post";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const createResponse = await repositoryPost.create({
      post: json as ModelPost,
    });

    if (!createResponse) throw { code: FailureTypes.Server } as Failure;

    return new Response("OK");
  } catch (e) {
    return new Response(undefined, {
      status: (e as Failure).code,
    });
  }
}

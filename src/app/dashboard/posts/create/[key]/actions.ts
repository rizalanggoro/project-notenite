"use server";

import ModelPost from "@/lib/data/models/post";
import { repositoryPost } from "@/lib/data/repositories/post";

type UpdatePostProps = {
  post: ModelPost;
};
export const updatePost = async (props: UpdatePostProps): Promise<boolean> => {
  return await repositoryPost.update({
    post: props.post,
  });
};

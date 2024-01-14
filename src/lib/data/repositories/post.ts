import ModelPost from "../models/post";
import { providerDeta } from "../providers/deta";

const create = async ({ post }: { post: ModelPost }) => {
  return await providerDeta.insert({
    basename: "post",
    payload: {
      item: { ...post },
    },
  });
};

type ReadProps = {
  userKey: string;
  last?: string;
};
const read = async (props: ReadProps) => {
  return await providerDeta.query({
    basename: "post",
    payload: {
      query: [{ userKey: props.userKey }],
      limit: 100,
      last: props.last,
    },
  });
};

type UpdateProps = {
  post: ModelPost;
};
const update = async (props: UpdateProps): Promise<boolean> => {
  if (props.post.key) {
    const response = await providerDeta.update({
      basename: "post",
      key: props.post.key,
      payload: {
        set: {
          ...props.post,
          key: undefined,
        },
      },
    });
    return response.ok;
  }
  return false;
};

const publish = () => {};

export const repositoryPost = {
  create,
  read,
  update,
};

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
};
const read = async (props: ReadProps) => {
  return await providerDeta.query({
    basename: "post",
    payload: {
      query: [{ userKey: props.userKey }],
    },
  });
};

const publish = () => {};

export const repositoryPost = {
  create,
  read,
  publish,
};

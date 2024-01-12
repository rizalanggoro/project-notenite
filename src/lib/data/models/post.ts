type ModelPost = {
  key?: string;
  userKey?: string;
  title?: string;
  description?: string;
  slug?: string;
  content?: string;
  createdAt?: number;
  updatedAt?: number;
  publishedAt?: number;
  visibility?: "private" | "public";
};

export default ModelPost;

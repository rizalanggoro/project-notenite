import ModelPost from "@/lib/data/models/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JWTPayload } from "jose";

type FetchPostsProps = {
  session: JWTPayload;
  last?: string;
};
const fetchPosts = createAsyncThunk(
  "post/fetch",
  async (props: FetchPostsProps, api): Promise<Array<ModelPost>> => {
    console.log("called");
    const response = await fetch("/api/dashboard/posts/read", {
      method: "POST",
      body: JSON.stringify({
        userKey: props.session.key,
        last: props.last,
      }),
    });

    if (response.ok) {
      const result: Array<ModelPost> = await response.json();
      if (result.length > 0) {
        const lastKey = result.at(result.length - 1)?.key;
        api.dispatch(fetchPosts({ session: props.session, last: lastKey }));
      }
      return result;
    }
    return [];
  }
);

// slice
const slice = createSlice({
  name: "post",
  initialState: {
    posts: <Array<ModelPost>>[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const { payload } = action;
      state.posts = [...state.posts, ...payload];
    });
  },
});

export const slicePosts = { reducer: slice.reducer, fetchPosts };

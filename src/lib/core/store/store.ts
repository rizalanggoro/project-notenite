import { configureStore } from "@reduxjs/toolkit";

// import SliceMyPost from "@/lib/core/store/slices/my-post";
import dashboardPosts from "@/app/dashboard/posts/slice";
import { slicePosts } from "@/lib/core/store/slices/post";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // global
      post: slicePosts.reducer,

      // per page
      dashboardPosts,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

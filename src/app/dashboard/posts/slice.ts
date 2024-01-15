// import { EnumStateStatus } from "@/lib/core/enums/state-type";
// import ModelPost from "@/lib/data/models/post";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { either } from "fp-ts";
// import { JWTPayload } from "jose";
// import * as serverActions from "./actions";

// export enum StateType {
//   initial,
//   readAll,
//   createPost,
// }

// interface State {
//   type: StateType;
//   status: EnumStateStatus;
//   allMyPosts: Array<ModelPost>;
//   isDialogCreatePostShowed: boolean;
// }
// const initialState: State = {
//   type: StateType.initial,
//   status: EnumStateStatus.initial,
//   allMyPosts: [],
//   isDialogCreatePostShowed: false,
// };

// const slice = createSlice({
//   name: "dashboardPosts",
//   initialState,
//   reducers: {
//     resetState: (state) => {
//       state.type = StateType.initial;
//       state.status = EnumStateStatus.initial;
//     },
//     changeDialogCreatePost: (state, { payload }: { payload: boolean }) => {
//       state.isDialogCreatePostShowed = payload;
//     },
//   },
//   extraReducers(builder) {
//     // read all
//     builder
//       .addCase(readAll.pending, (state) => {
//         state.type = StateType.readAll;
//         state.status = EnumStateStatus.loading;
//       })
//       .addCase(readAll.fulfilled, (state, action) => {
//         const { payload } = action;
//         state.type = StateType.readAll;
//         if (either.isLeft(payload)) {
//           state.status = EnumStateStatus.failure;
//         } else {
//           state.status = EnumStateStatus.success;
//           state.allMyPosts = payload.right;
//         }
//       });

//     // create post
//     builder
//       .addCase(createPost.pending, (state) => {
//         state.type = StateType.createPost;
//         state.status = EnumStateStatus.loading;
//       })
//       .addCase(createPost.fulfilled, (state, action) => {
//         const { payload } = action;
//         state.type = StateType.createPost;
//         if (either.isLeft(payload)) {
//           state.status = EnumStateStatus.failure;
//         } else {
//           state.status = EnumStateStatus.success;
//           state.allMyPosts.push(payload.right);
//         }
//         state.isDialogCreatePostShowed = false;
//       });
//   },
// });

// // thunks
// const readAll = createAsyncThunk(
//   "dashboardPosts/readAll",
//   async (props: { session: JWTPayload }) => await serverActions.readAll(props)
// );

// const createPost = createAsyncThunk(
//   "dashboardPosts/createPost",
//   async (props: { title: string; description: string; userKey: string }) =>
//     serverActions.createPost(props)
// );

// export default slice.reducer;
// export const actions = { ...slice.actions, readAll, createPost };

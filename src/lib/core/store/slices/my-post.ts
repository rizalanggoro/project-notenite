// import { ActionMyPost } from "@/lib/actions/my-post";
// import ModelPost from "@/lib/data/models/post";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { JWTPayload } from "jose";
// import { StateStatus } from "../../types/state-status";

// interface ReadAllProps {
//   session: JWTPayload;
// }
// const readAll = createAsyncThunk(
//   "myPost/readAll",
//   async (props: ReadAllProps) => {
//     console.log("called");
//     const res = await ActionMyPost.readAll(props);
//     console.log(res);
//   }
// );

// interface State {
//   type: "initial" | "readAll";
//   status: StateStatus;
//   posts: Array<ModelPost>;
// }

// const slice = createSlice({
//   name: "myPost",
//   initialState: {
//     type: "initial",
//     status: "initial",
//     posts: [],
//   } as State,
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(readAll.pending, (state, action) => {
//         state.type = "readAll";
//         state.status = "loading";
//       })
//       .addCase(readAll.fulfilled, (state, action) => {
//         state.type = "readAll";
//         state.status = "success";

//         console.log(action.payload);
//       })
//       .addCase(readAll.rejected, (state, action) => {
//         state.type = "readAll";
//         state.status = "failure";
//       });
//   },
// });

// export default slice.reducer;
// export const SliceMyPostActions = { readAll };

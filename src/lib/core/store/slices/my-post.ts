import ModelPost from "@/lib/data/models/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../types/state-status";

const readAll = createAsyncThunk("myPost/readAll", async () => {
  console.log("read all called");
});

interface State {
  type: "initial" | "readAll";
  status: StateStatus;
  posts: Array<ModelPost>;
}
const slice = createSlice({
  name: "myPost",
  initialState: {
    type: "initial",
    status: "initial",
    posts: [],
  } as State,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(readAll.pending, (state, action) => {
        state.type = "readAll";
        state.status = "loading";
      })
      .addCase(readAll.fulfilled, (state, status) => {
        state.type = "readAll";
        state.status = "success";
      })
      .addCase(readAll.rejected, (state, status) => {
        state.type = "readAll";
        state.status = "failure";
      });
  },
});

export default slice.reducer;
export const MyPostActions = { readAll };

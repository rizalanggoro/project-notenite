import { create } from "zustand";

interface State {}

interface Action {}

const initialState: State = {};

export const useStorePostDetail = create<State & Action>()((set) => ({
  ...initialState,
}));

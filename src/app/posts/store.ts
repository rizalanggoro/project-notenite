import { EnumStateStatus } from "@/lib/core/enums/state-type";
import ModelPost from "@/lib/data/models/post";
import { either } from "fp-ts";
import { create } from "zustand";
import * as serverActions from "./actions";

export const enum StateType {
  initial,
  readAll,
}

interface State {
  type: StateType;
  status: EnumStateStatus;
  posts: Array<ModelPost>;
}

interface Actions {
  resetToInitial: () => void;
  readAll: () => Promise<void>;
}

const initialState: State = {
  type: StateType.initial,
  status: EnumStateStatus.initial,

  posts: [],
};

export const useStorePosts = create<State & Actions>()((set, get) => ({
  ...initialState,

  // actions
  resetToInitial() {
    setTimeout(
      () =>
        set({
          type: StateType.initial,
          status: EnumStateStatus.initial,
        }),
      0
    );
  },

  async readAll() {
    set({ type: StateType.readAll, status: EnumStateStatus.loading });

    const res = await serverActions.readAll();
    if (either.isLeft(res)) {
      set({ type: StateType.readAll, status: EnumStateStatus.failure });
    } else {
      set({
        type: StateType.readAll,
        status: EnumStateStatus.success,
        posts: res.right,
      });
    }

    get().resetToInitial();
  },
}));

import { EnumStateStatus } from "@/lib/core/enums/state-type";
import ModelPost from "@/lib/data/models/post";
import { either } from "fp-ts";
import { JWTPayload } from "jose";
import { create } from "zustand";
import * as serverActions from "./actions";

export const enum StateType {
  initial,
  readAll,
  createPost,
  deletePost,
}

interface State {
  type: StateType;
  status: EnumStateStatus;

  posts: Array<ModelPost>;
}

const initialState: State = {
  type: StateType.initial,
  status: EnumStateStatus.initial,

  posts: [],
};

interface Actions {
  resetToInitial: () => void;
  readAll: (props: { session: JWTPayload }) => Promise<void>;
  createPost: (props: {
    session: JWTPayload;
    title: string;
    description: string;
  }) => Promise<boolean>;
  deletePost: (props: { key: string }) => Promise<boolean>;
}

export const useStoreDashboardPosts = create<State & Actions>()((set, get) => ({
  ...initialState,

  // actions
  resetToInitial: () => {
    setTimeout(
      () =>
        set({
          type: StateType.initial,
          status: EnumStateStatus.initial,
        }),
      0
    );
  },

  readAll: async ({ session }) => {
    const userKey = session.key;
    if (userKey) {
      set({ type: StateType.readAll, status: EnumStateStatus.loading });

      const res = await serverActions.readAll({ userKey: userKey as string });
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
    }
  },

  createPost: async (props) => {
    const userKey = props.session.key;
    let isSuccess = false;
    if (userKey) {
      set({ type: StateType.createPost, status: EnumStateStatus.loading });

      const res = await serverActions.createPost({
        title: props.title,
        description: props.description,
        userKey: userKey as string,
      });
      if (either.isLeft(res)) {
        set({ type: StateType.createPost, status: EnumStateStatus.failure });
      } else {
        isSuccess = true;
        set((state) => ({
          type: StateType.createPost,
          status: EnumStateStatus.success,
          posts: [res.right, ...state.posts],
        }));
      }

      get().resetToInitial();
    }

    return isSuccess;
  },

  deletePost: async (props) => {
    let isSuccess = false;
    set({ type: StateType.deletePost, status: EnumStateStatus.loading });

    const res = await serverActions.deletePost(props);
    if (either.isLeft(res)) {
      set({ type: StateType.deletePost, status: EnumStateStatus.failure });
    } else {
      isSuccess = true;
      set((state) => ({
        type: StateType.deletePost,
        status: EnumStateStatus.success,
        posts: state.posts.filter((post) => post.key != props.key),
      }));
    }

    get().resetToInitial();
    return isSuccess;
  },
}));

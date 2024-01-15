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
  reset: () => void;
  readAll: (props: { session: JWTPayload }) => Promise<void>;
  createPost: (props: {
    session: JWTPayload;
    title: string;
    description: string;
  }) => Promise<boolean>;
  deletePost: (props: { key: string }) => Promise<boolean>;
}

export const useDashboardPosts = create<State & Actions>()((set, get) => ({
  ...initialState,

  // actions
  reset: () => {
    set((state) => ({
      ...initialState,
      posts: state.posts,
    }));
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
    }
  },

  createPost: async (props) => {
    const userKey = props.session.key;
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
        set((state) => ({
          type: StateType.createPost,
          status: EnumStateStatus.success,
          posts: [...state.posts, res.right],
        }));
        return true;
      }
    }

    return false;
  },

  deletePost: async (props) => {
    set({ type: StateType.deletePost, status: EnumStateStatus.loading });

    const res = await serverActions.deletePost(props);
    if (either.isLeft(res)) {
      set({ type: StateType.deletePost, status: EnumStateStatus.failure });
    } else {
      set((state) => ({
        type: StateType.deletePost,
        status: EnumStateStatus.success,
        posts: state.posts.filter((post) => post.key != props.key),
      }));
      return true;
    }

    return false;
  },
}));

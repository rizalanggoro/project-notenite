import ModelPost from "@/lib/data/models/post";
import { create } from "zustand";

interface State {
  posts: Array<ModelPost>;
  isDialogCreatePostVisible: boolean;
}

export const useDashboardPosts = create<State>()((set) => ({
  posts: [],
  isDialogCreatePostVisible: false,

  updateDialogCreatePostVisibile: (newValue: boolean) =>
    set(() => ({ isDialogCreatePostVisible: newValue })),

  // async
  readAll: async () => set((state) => ({})),
}));

"use client";
import { AppStore, makeStore } from "@/lib/core/store/store";
import { JWTPayload } from "jose";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
  session,
}: {
  session?: JWTPayload;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // loading initial data
    // storeRef.current.dispatch(initializeCount(count))
    if (session) {
      // storeRef.current.dispatch(slicePosts.fetchPosts({ session }));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

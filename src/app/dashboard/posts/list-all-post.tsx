"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StateStatus } from "@/lib/core/types/state-status";
import ModelPost from "@/lib/data/models/post";
import { JWTPayload } from "jose";
import { useEffect, useState } from "react";

type Props = {
  session: JWTPayload;
};

type State = {
  status: StateStatus;
  posts: Array<ModelPost>;
};

export default function ListAllPosts(props: Props) {
  const [state, setState] = useState<State>({
    status: "initial",
    posts: [],
  });

  const readAllPosts = async () => {
    setState({ ...state, status: "loading" });

    const response = await fetch("/api/dashboard/posts/read", {
      method: "POST",
      body: JSON.stringify({ userKey: props.session.key }),
    });

    if (response.ok) {
      const json = await response.json();
      return setState({ ...state, status: "success", posts: json });
    }

    return setState({ ...state, status: "failure" });
  };

  useEffect(() => {
    readAllPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {state.posts.map((item, index) => (
          <Card key={"all-post-item-" + index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}

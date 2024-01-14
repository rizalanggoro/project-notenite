"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnumStateStatus } from "@/lib/core/enums/state-type";
import { useAppDispatch, useAppSelector } from "@/lib/core/store/hooks";
import { JWTPayload } from "jose";
import Link from "next/link";
import { useEffect } from "react";
import * as slice from "./slice";

type Props = {
  session: JWTPayload;
};

export default function ListAllPosts(props: Props) {
  const dispatch = useAppDispatch();
  const allMyPosts = useAppSelector((state) => state.dashboardPosts.allMyPosts);
  const type = useAppSelector((state) => state.dashboardPosts.type);
  const status = useAppSelector((state) => state.dashboardPosts.status);

  useEffect(() => {
    if (allMyPosts.length == 0) {
      dispatch(slice.actions.readAll(props));
    }
  }, [allMyPosts]);

  return (
    <>
      {type == slice.StateType.readAll && status == EnumStateStatus.loading && (
        <p>Reading all my posts...</p>
      )}
      <div className="flex flex-col gap-2">
        {allMyPosts.map((item, index) => (
          <Card key={"all-post-item-" + index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant={"destructive"} size={"sm"}>
                Hapus
              </Button>
              <Button size={"sm"} asChild>
                <Link href={"/dashboard/posts/create/" + item.key}>Ubah</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

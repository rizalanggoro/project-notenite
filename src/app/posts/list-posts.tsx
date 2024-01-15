"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useStorePosts } from "./store";

export default function ListPosts() {
  const { type, status, posts, readAll } = useStorePosts();

  useEffect(() => {
    if (posts.length == 0) readAll();
  }, [posts]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {posts.map((post, index) => (
          <Card key={"post-item-" + index} className="h-full">
            <CardHeader>
              <CardTitle className="leading-normal line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="leading-normal line-clamp-3">
                {post.description}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button variant={"link"} className="px-0">
                Baca selengkapnya
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

"use client";

import ComponentContainer from "@/components/container";
import ComponentTiptapEditor from "@/components/tiptap/editor";

export default function Page() {
  return (
    <>
      <ComponentContainer variant="max">
        <p className="text-3xl font-semibold my-4">Create a new post</p>
        <ComponentTiptapEditor />
      </ComponentContainer>
    </>
  );
}

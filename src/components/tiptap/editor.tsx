"use client";

import { StateStatus } from "@/lib/core/types/state-status";
import { Editor, EditorContent } from "@tiptap/react";
import "katex/dist/katex.min.css";
import { Card } from "../ui/card";
import "./editor.scss";
import ComponentTiptapToolbar from "./toolbar";

type Props = {
  editor: Editor;
  autoSaveState?: StateStatus;
};

export default function ComponentTiptapEditor(props: Props) {
  return (
    <>
      <ComponentTiptapToolbar
        editor={props.editor}
        autoSaveState={props.autoSaveState}
      />
      <Card>
        <EditorContent
          editor={props.editor}
          className="prose dark:prose-invert text-justify max-w-full w-full"
        />
      </Card>
    </>
  );
}

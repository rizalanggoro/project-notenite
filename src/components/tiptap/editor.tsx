"use client";

import MathExtension from "@/lib/core/tiptap-extensions/math";
import TableExtension from "@tiptap/extension-table";
import TableCellExtension from "@tiptap/extension-table-cell";
import TableHeaderExtension from "@tiptap/extension-table-header";
import TableRowExtension from "@tiptap/extension-table-row";
import UnderlineExtension from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "katex/dist/katex.min.css";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import "./editor.scss";
import ComponentTiptapToolbar from "./toolbar";

export default function ComponentTiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: "tiptap-editor-heading",
          },
        },
      }),
      UnderlineExtension,
      MathExtension,
      TableExtension.configure({
        resizable: false,
        HTMLAttributes: {
          class: "tiptap-editor-table",
        },
      }),
      TableCellExtension.configure({
        HTMLAttributes: {
          class: "tiptap-editor-table-cell",
        },
      }),
      TableHeaderExtension.configure({
        HTMLAttributes: {
          class: "tiptap-editor-table-header",
        },
      }),
      TableRowExtension.configure({
        HTMLAttributes: {
          class: "tiptap-editor-table-row",
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "tiptap-editor outline-none w-full px-8 py-6 overflow-x-auto min-h-72",
      },
    },
  });

  if (!editor) {
    return (
      <>
        <Alert className="max-w-[480px]">
          <Loader2 className="animate-spin w-4 h-4" />
          <AlertTitle>Loading</AlertTitle>
          <AlertDescription>Setting up an editor for you...</AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <ComponentTiptapToolbar editor={editor} />
      <Button
        onClick={() => {
          editor.commands.insertContent({
            type: "inlineMath",
            attrs: {
              display: "no",
              latex: "f(x)",
            },
          });
        }}
      >
        Add math
      </Button>
      <Button onClick={() => console.log(editor.getJSON())}>Print data</Button>
      <Card>
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert text-justify max-w-full w-full"
        />
      </Card>
    </>
  );
}

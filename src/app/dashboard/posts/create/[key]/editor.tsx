"use client";

import ComponentTiptapEditor from "@/components/tiptap/editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import MathExtension from "@/lib/core/tiptap-extensions/math";
import { StateStatus } from "@/lib/core/types/state-status";
import ModelPost from "@/lib/data/models/post";
import TableExtension from "@tiptap/extension-table";
import TableCellExtension from "@tiptap/extension-table-cell";
import TableHeaderExtension from "@tiptap/extension-table-header";
import TableRowExtension from "@tiptap/extension-table-row";
import UnderlineExtension from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { updatePost } from "./actions";

type Props = {
  post: ModelPost;
};

type State = {
  autoSaveStatus: StateStatus;
};

export default function DashboardPostCreateEditor(props: Props) {
  const [state, setState] = useState<State>({
    autoSaveStatus: "initial",
  });

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
    content: props.post.content ? JSON.parse(props.post.content) : "",
    editorProps: {
      attributes: {
        class:
          "tiptap-editor outline-none w-full px-8 py-6 overflow-x-auto min-h-72",
      },
    },
  });

  const [editorDebounce] = useDebounce(editor?.state.doc.content, 2000);
  useEffect(() => {
    if (editor && editorDebounce) {
      setState({ ...state, autoSaveStatus: "loading" });

      updatePost({
        post: {
          ...props.post,
          content: JSON.stringify(editor.getJSON()),
        },
      }).then((result) => {
        console.log("saved");
        if (result) setState({ ...state, autoSaveStatus: "success" });
      });
    }
  }, [editorDebounce, editor]);

  useEffect(() => {
    if (editor) {
      setState({ ...state, autoSaveStatus: "initial" });
    }
  }, [editor?.state.doc.content]);

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
      <ComponentTiptapEditor
        editor={editor}
        autoSaveState={state.autoSaveStatus}
      />
    </>
  );
}

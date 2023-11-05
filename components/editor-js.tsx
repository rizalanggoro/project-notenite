"use client";

import ToolFormula from "@/utils/plugins/formula/index";
import ToolCode from "@editorjs/code";
import EditorJS from "@editorjs/editorjs";
import ToolHeader from "@editorjs/header";
import ToolList from "@editorjs/list";
import ToolNestedList from "@editorjs/nested-list";
import { useEffect, useRef } from "react";

// import katex
import "@/styles/plugin-math.css";
import "katex/dist/katex.min.css";

export default function ComponentEditorJS({
  data,
  onChange,
  holder,
}: {
  holder: string;
  data: EditorJS.OutputData | undefined;
  onChange: (data: EditorJS.OutputData) => void;
}) {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder,
        data,
        placeholder: "Write something...",
        inlineToolbar: true,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
        tools: {
          list: {
            class: ToolList,
          },
          nested_list: {
            class: ToolNestedList,
          },
          header: {
            class: ToolHeader,
            config: {
              defaultLevel: 3,
            },
          },
          code: {
            class: ToolCode,
          },
          formula: {
            class: ToolFormula,
          },
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="prose prose-lg max-w-[1024px] mx-auto">
        <div id={holder} className="w-full"></div>
      </div>
    </>
  );
}

"use client";

import ToolMathBlock from "@/lib/core/editorjs-tools/math-block";
import ToolCode from "@editorjs/code";
import ToolDelimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import ToolHeader from "@editorjs/header";
import ToolInlineCode from "@editorjs/inline-code";
import ToolMarker from "@editorjs/marker";
import ToolNestedList from "@editorjs/nested-list";
import ToolQuote from "@editorjs/quote";
import ToolTable from "@editorjs/table";
import ToolUnderline from "@editorjs/underline";
import ToolWarning from "@editorjs/warning";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";
import "./editorjs.scss";

export default function ComponentEditorJS(props) {
  const editorRef = useRef();

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: props.id,
        data: props.data,
        placeholder: "Write something...",
        inlineToolbar: true,
        async onChange(api) {
          const data = await api.saver.save();
          props.onDataChange(data);
        },
        tools: {
          header: {
            class: ToolHeader,
            config: {
              defaultLevel: 3,
            },
          },
          quote: {
            class: ToolQuote,
          },
          warning: {
            class: ToolWarning,
          },
          delimiter: {
            class: ToolDelimiter,
          },
          list: {
            class: ToolNestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          table: {
            class: ToolTable,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          code: {
            class: ToolCode,
          },
          marker: {
            class: ToolMarker,
            shortcut: "CMD+SHIFT+M",
          },
          inlineCode: {
            class: ToolInlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          underline: {
            class: ToolUnderline,
          },
          math: {
            class: ToolMathBlock,
          },
        },
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="component-editorjs">
        <div className="prose w-full">
          <div id={props.id} className="w-full"></div>
        </div>
      </div>
    </>
  );
}

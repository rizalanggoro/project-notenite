"use client";

import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import ToolList from "@editorjs/list";
import ToolNestedList from "@editorjs/nested-list";
import ToolHeader from "@editorjs/header";
import ToolCode from "@editorjs/code";
import ToolMath from "editorjs-latex";
import Script from "next/script";

// import katex
import "katex/dist/katex.min.css";
import "@/styles/tool-math.css";

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
          math: {
            class: ToolMath,
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
      {/* mathjax script */}
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" />
      <Script
        async
        id="MathJax-script"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
      />

      <div
        id={holder}
        className="prose prose-lg prose-lime max-w-[1024px] mx-auto"
      ></div>
    </>
  );
}

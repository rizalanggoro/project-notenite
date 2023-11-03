"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ComponentEditorJS = dynamic(() => import("@/components/editor-js"), {
  ssr: false,
});

export default function EditorClient() {
  const [data, setData] = useState<EditorJS.OutputData>();

  return (
    <>
      <p>Editor Client</p>
      <ComponentEditorJS
        data={data}
        holder="editor-js-element"
        onChange={setData}
      ></ComponentEditorJS>

      <div>
        <p>JSON: {JSON.stringify(data)}</p>
      </div>
    </>
  );
}

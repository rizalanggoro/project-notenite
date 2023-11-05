"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ComponentEditorJS = dynamic(() => import("@/components/editor-js"), {
  ssr: false,
});

export default function EditorClient() {
  const [data, setData] = useState<EditorJS.OutputData>();
  const [isLoaded, setIsLoaded] = useState(false);

  const saveData = () => {
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
      console.log("data saved!");
    }
  };

  const loadData = () => {
    const data = localStorage.getItem("data");
    if (data) {
      setData(JSON.parse(data));
      console.log("data loaded!");
    }
    setIsLoaded(true);
  };

  useEffect(() => loadData(), []);

  return (
    <>
      <p>Editor Client</p>
      {/* <div className="plugin-math-container">
        <p className="plugin-math-preview" id="latex-preview">
          Equation $$f(x) = ax+b+10000+127896+192319+19827389127+19231298$$
        </p>
        <input
          value={latexData}
          onChange={(event) => setLatexData(event.target.value)}
          type="text"
          placeholder="Insert LaTex equation..."
          className="plugin-math-input"
          onKeyUp={renderKatex}
        />
      </div> */}
      {isLoaded && (
        <ComponentEditorJS
          data={data}
          holder="editor-js-element"
          onChange={setData}
        ></ComponentEditorJS>
      )}

      <div>
        <button onClick={() => saveData()}>Save</button>
        <button onClick={() => loadData()}>Load</button>
      </div>

      <div>
        <p>JSON: {JSON.stringify(data)}</p>
      </div>
    </>
  );
}

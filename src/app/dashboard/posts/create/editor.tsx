"use client";

import ComponentEditorJSPreview from "@/components/editorjs/preview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ComponentEditorJS = dynamic(
  () => import("@/components/editorjs/editorjs"),
  { ssr: false }
);

export default function DashboardPostCreateEditor() {
  const [isGettingData, setIsGettingData] = useState(true);
  const [data, setData] = useState<OutputData>();

  const saveToLocalStorage = () => {
    localStorage.setItem("editor-data", JSON.stringify(data));
  };

  useEffect(() => {
    const editorData = localStorage.getItem("editor-data");
    if (editorData) {
      console.log(editorData);
      setData(JSON.parse(editorData));
    }
    setIsGettingData(false);
  }, []);

  return (
    <>
      <div>
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <div className="">
              {isGettingData || (
                <Card className="overflow-hidden px-16 py-4 dark:bg-card-foreground">
                  <ComponentEditorJS
                    id="editor-js"
                    data={data}
                    onDataChange={setData}
                  />
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <Card className="px-8 py-8">
              <ComponentEditorJSPreview data={data} />
            </Card>
          </TabsContent>
        </Tabs>

        <Button onClick={() => saveToLocalStorage()}>Done</Button>
        <Button onClick={() => console.log(data?.blocks)}>Print data</Button>
      </div>
    </>
  );
}

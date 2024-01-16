"use client";

import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";

interface Props {
  contentHTML: string;
}

export default function Content(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(props.contentHTML);

  useEffect(() => {
    const renderKatex = async () => {
      const container = contentRef.current;
      if (container) {
        const els = container.querySelectorAll('p > span[data-type="math"]');
        els.forEach((el) => {
          katex.render(
            el.getAttribute("data-latex") ?? "null",
            el as HTMLElement
          );
        });

        setContent(container.innerHTML);
      }
    };

    renderKatex();
  }, []);

  return (
    <>
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose dark:prose-invert max-w-full"
      ></div>
    </>
  );
}

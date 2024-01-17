"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import htmlParse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  Text,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const parseOptions: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      const { name, attribs } = domNode;
      const props = attributesToProps(attribs);
      const children = domToReact(domNode.children as DOMNode[], parseOptions);

      // table
      if (name === "table") return <Table {...props}>{children}</Table>;

      if (name === "thead")
        return <TableHeader {...props}>{children}</TableHeader>;

      if (name === "tbody") return <TableBody {...props}>{children}</TableBody>;

      if (name === "tr") return <TableRow {...props}>{children}</TableRow>;

      if (name === "th") return <TableHead {...props}>{children}</TableHead>;

      if (name === "td") return <TableCell {...props}>{children}</TableCell>;

      // code block
      if (name === "pre") {
        const childCode = domNode.children[0] as Element;
        if (childCode && childCode.name === "code") {
          const language = childCode.attribs.class.replaceAll("language-", "");
          const childText = childCode.children[0] as Text;
          if (childText) {
            return (
              <ReactSyntaxHighlighter
                showLineNumbers
                language={language}
                style={nightOwl}
              >
                {childText.data}
              </ReactSyntaxHighlighter>
            );
          }
        }
      }
    }
  },
};

interface Props {
  contentHTML: string;
}
export default function Content(props: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>(props.contentHTML);

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
      <div ref={contentRef} className="prose dark:prose-invert max-w-full">
        {htmlParse(props.contentHTML, parseOptions)}
      </div>
    </>
  );
}

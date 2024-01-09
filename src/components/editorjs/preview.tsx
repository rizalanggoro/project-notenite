import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  data: OutputData | undefined;
};

const ItemHeader = (item: OutputBlockData) => {
  const { level, text } = item.data;
  return (
    <div
      key={item.id}
      dangerouslySetInnerHTML={{
        __html: `<h${level}>${text}</h${level}>`,
      }}
    ></div>
  );
};

const ItemParagraph = (item: OutputBlockData) => {
  const { text } = item.data;
  return (
    <div
      key={item.id}
      className="text-foreground"
      dangerouslySetInnerHTML={{
        __html: `<p>${text}</p>`,
      }}
    ></div>
  );
};

const ItemMath = (item: OutputBlockData) => {
  const { latex } = item.data;
  const latexStr = katex.renderToString(latex);

  return (
    <div
      key={item.id}
      className="w-full text-center"
      dangerouslySetInnerHTML={{
        __html: latexStr,
      }}
    ></div>
  );
};

const ItemTable = (item: OutputBlockData) => {
  const { id } = item;
  const {
    content,
    withHeadings,
  }: {
    content: Array<Array<any>>;
    withHeadings: boolean;
  } = item.data;

  return (
    <div key={id} className="not-prose">
      <Table>
        {withHeadings && content.length > 0 && (
          <TableHeader className={classNameProse}>
            <TableRow>
              {content[0].map((item, index) => (
                <TableHead key={id + "-head-" + index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody className={classNameProse}>
          {content.slice(withHeadings ? 1 : 0).map((item, index) => (
            <TableRow key={id + "-body-" + index}>
              {item.map((item2, index2) => (
                <TableCell key={id + "-body-cell-" + index2}>{item2}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ItemQuote = (item: OutputBlockData) => {
  const { id, data } = item;
  const { alignment, caption, text } = data;

  return (
    <div key={id}>
      <blockquote>
        <p className="not-prose">{text}</p>
        <p className="not-prose">~ {caption}</p>
      </blockquote>
    </div>
  );
};

const ItemWarning = (item: OutputBlockData) => {
  const { id, data } = item;
  const { message, title } = data;

  return (
    <Alert key={id} variant={"destructive"} className="not-prose">
      <Info className="w-4 h-4" />
      <AlertTitle className="not-prose">{title}</AlertTitle>
      <AlertDescription className="not-prose">{message}</AlertDescription>
    </Alert>
  );
};

const classNameProse = "prose dark:prose-invert w-full mx-auto";

export default function ComponentEditorJSPreview(props: Props) {
  return (
    <>
      <div>
        <div className={classNameProse}>
          {props.data?.blocks.map((item, index) => {
            switch (item.type) {
              case "header":
                return ItemHeader(item);

              case "paragraph":
                return ItemParagraph(item);

              case "math":
                return ItemMath(item);

              case "table":
                return ItemTable(item);

              case "quote":
                return ItemQuote(item);

              case "warning":
                return ItemWarning(item);

              default:
                return (
                  <div key={item.id}>
                    [{item.type}] element not implemented yet.
                  </div>
                );
            }
          })}
        </div>
      </div>
    </>
  );
}

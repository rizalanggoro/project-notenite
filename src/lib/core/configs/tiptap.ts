import TableExtension from "@tiptap/extension-table";
import TableCellExtension from "@tiptap/extension-table-cell";
import TableHeaderExtension from "@tiptap/extension-table-header";
import TableRowExtension from "@tiptap/extension-table-row";
import UnderlineExtension from "@tiptap/extension-underline";
import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MathExtension from "../tiptap-extensions/math";

const extensions: Extensions = [
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
];

export const ConfigTiptap = { extensions };

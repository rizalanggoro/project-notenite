import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Check,
  ChevronDown,
  Italic,
  Redo,
  Table2,
  Underline,
  Undo,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Toggle } from "../ui/toggle";

type Props = {
  editor: Editor;
};

export default function ComponentTiptapToolbar({ editor }: Props) {
  return (
    <>
      <Card className="sticky top-[5.25rem] bg-card z-10 p-2 border rounded-md my-4">
        <div className="w-full flex items-center gap-0.5">
          {/* text style */}
          <ComponentHistory editor={editor} />
          <Separator orientation="vertical" className="h-9" />
          <ComponentTextStyle editor={editor} />
          <Separator orientation="vertical" className="h-9" />
          <Toggle
            size={"sm"}
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </Toggle>
          <Toggle
            size={"sm"}
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </Toggle>{" "}
          <Toggle
            size={"sm"}
            pressed={editor.isActive("underline")}
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
          >
            <Underline className="w-4 h-4" />
          </Toggle>
          <Separator orientation="vertical" className="h-9" />
          <ComponentTable editor={editor} />
        </div>
      </Card>
    </>
  );
}

const ComponentTable = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="w-9 h-9"
        onClick={() => {
          if (editor.isActive("table")) {
            console.log("cannot create table inside table!");
            return;
          }
          editor.chain().focus().insertTable().run();
        }}
      >
        <Table2 className="w-4 h-4" />
      </Button>
    </>
  );
};

const ComponentHistory = ({ editor }: { editor: Editor }) => {
  const actions = [
    {
      icon: <Undo className="w-4 h-4" />,
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo className="w-4 h-4" />,
      action: () => editor.chain().focus().redo().run(),
    },
  ];
  return (
    <>
      {actions.map((item, index) => (
        <Button
          key={"toolbar-button-history-" + index}
          size={"icon"}
          variant={"ghost"}
          className="h-9 w-9"
          onClick={() => item.action()}
        >
          {item.icon}
        </Button>
      ))}
    </>
  );
};

const ComponentTextStyle = ({ editor }: { editor: Editor }) => {
  const isActiveHeading = editor.isActive("heading");
  const activeHeadingLevel = editor.getAttributes("heading").level;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          {editor.isActive("heading")
            ? "Heading " + activeHeadingLevel
            : "Paragraph"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Text style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* headings: 1-4 */}
        {[1, 2, 3, 4].map((item, index) => (
          <DropdownMenuItem
            key={"dropdown-menu-item-heading-" + index}
            onClick={() =>
              editor
                .chain()
                .focus()
                .setHeading({ level: item as Level })
                .run()
            }
          >
            {isActiveHeading && activeHeadingLevel == item ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <div className="w-4 mr-2"></div>
            )}
            Heading {item}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          {!isActiveHeading ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <div className="w-4 mr-2"></div>
          )}
          Paragraph
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

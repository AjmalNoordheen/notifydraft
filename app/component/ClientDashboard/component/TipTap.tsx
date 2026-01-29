"use client";

import {
  BackgroundColor,
  Color,
  TextStyle,
} from "@tiptap/extension-text-style";
import "./styles.css";
import {
  useEditor,
  EditorContent,
  useEditorState,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import OrderListIcon from "../../icons/OrderListIcon";
import UnOrderList from "../../icons/UnOrderList";
import FillIcon from "../../icons/FillIcon";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import PenIcon from "../../icons/PenIcon";

const MenuBar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        color: ctx.editor?.getAttributes("textStyle").backgroundColor,
        textColor: ctx.editor?.getAttributes("textStyle").color,
        isOrderList: ctx.editor?.isActive("orderedList") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isBold: ctx.editor?.isActive("bold") ?? false,
      };
    },
  });
  const handleHeading = (value: string) => {
    value === "paragraph"
      ? editor.chain().focus().setParagraph().run()
      : value == "heading1"
      ? editor.chain().focus().toggleHeading({ level: 1 }).run()
      : value == "heading2"
      ? editor.chain().focus().toggleHeading({ level: 2 }).run()
      : editor.chain().focus().toggleHeading({ level: 3 }).run();
  };
  return (
    <>
      <div className="pb-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editorState.isBulletList
                ? "text-2xl font-extrabold text-black cursor-pointer border border-black rounded p-1"
                : "text-gray-500 text-2xl cursor-pointer border border-slate-300 rounded p-1"
            }
          >
            <UnOrderList />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editorState.isOrderList
                ? "text-2xl font-extrabold text-black cursor-pointer border border-black rounded p-1"
                : "text-gray-500 text-2xl cursor-pointer border border-slate-300 rounded p-1"
            }
          >
            <OrderListIcon />
          </button>
          <input
            id="colorId"
            type="color"
            title="select background"
            onInput={(event) =>
              editor
                .chain()
                .focus()
                .setBackgroundColor(event.currentTarget.value)
                .run()
            }
            value={
              editorState.color?.startsWith("#") ? editorState.color : "#ffffff"
            }
            data-testid="setBackgroundColor"
            className="h-0 w-0 opacity-0 cursor-pointer border-0 p-0 rounded-full appearance-none! "
          />
          <button
            onClick={() => document.getElementById("colorId")?.click()}
            className={`cursor-pointer ${editorState?.color ? 'border-black' : 'border-slate-300'} border rounded p-1 `}
            style={{ color: editorState.color || "#6a7282" }}
          >
            <FillIcon />
          </button>
          <input
            id="textColorId"
            type="color"
            title="select background"
            onInput={(event) =>
              editor.chain().focus().setColor(event.currentTarget.value).run()
            }
            value={
              editorState.textColor?.startsWith("#")
                ? editorState.textColor
                : "#000000"
            }
            data-testid="setTextColor"
            className="h-0 w-0 opacity-0 cursor-pointer border-0 p-0 rounded-full appearance-none! "
          />
          <button
            onClick={() => document.getElementById("textColorId")?.click()}
            className={`cursor-pointer ${editorState?.textColor ? 'border-black' : 'border-slate-300'} border rounded p-1 `}
            style={{ color: editorState.textColor || "#6a7282" }}
          >
            <PenIcon />
          </button>
          <select
            value={
              editorState.isHeading1
                ? "heading1"
                : editorState.isHeading2
                ? "heading2"
                : editorState.isHeading3
                ? "heading3"
                : "paragraph"
            }
            className="border border-slate-300 rounded pb-1.75 cursor-pointer"
            onChange={(e) => {
              handleHeading(e.target.value);
            }}
          >
            <option value="paragraph">p</option>
            <option value="heading1">h1</option>
            <option value="heading2">h2</option>
            <option value="heading3">h3</option>
          </select>
          <button
            onClick={() => {
              console.log("clicked--");
              editor.chain().focus().toggleBold().run();
            }}
            className={
              editorState.isBold
                ? "text-xl font-extrabold text-black cursor-pointer  border border-black rounded px-2"
                : "text-gray-500 text-lg font-bold cursor-pointer  border border-slate-300 rounded px-2"
            }
          >
            B
          </button>
        </div>
      </div>
    </>
  );
};

const Tiptap = ({ content = "", onChange }: { content?: string; onChange?: (html: string) => void } = {}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
        heading: false,
        bold: false,
      }),
      BackgroundColor,
      TextStyle,
      Color,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Bold,
    ],
    onUpdate({ editor }) {
      console.log(editor.getHTML());
      onChange?.(editor.getHTML());
    },
    content: content,
    immediatelyRender: false,
  });

  if (!editor) return;
  return (
    <>
    <div className="border p-2 border-slate-300 rounded-md">

      <MenuBar editor={editor} />
      <EditorContent
        className="border border-slate-300 p-1 min-h-37.5 max-h-80 overflow-auto rounded-md max-w-full"
        allowFullScreen
        autoFocus={false}
        editor={editor}
        draggable={true}
      />
    </div>
    </>
  );
};

export default Tiptap;

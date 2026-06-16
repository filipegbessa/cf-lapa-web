"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { MovementNode } from "@/lib/movement-node";

interface RichEditorProps {
  value?: string;
  onChange: (html: string) => void;
  onEditorReady?: (editor: Editor) => void;
  placeholder?: string;
}

export function RichEditor({
  value = "",
  onChange,
  onEditorReady,
  placeholder = "Escreva aqui...",
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, MovementNode],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-200 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-9 w-9 flex items-center justify-center rounded text-sm font-medium transition-all ${
            editor.isActive("bold")
              ? "bg-[#E63946] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
          }`}
          title="Negrito"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-9 w-9 flex items-center justify-center rounded text-sm font-medium transition-all ${
            editor.isActive("italic")
              ? "bg-[#E63946] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
          }`}
          title="Itálico"
        >
          <em>I</em>
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-9 w-9 flex items-center justify-center rounded text-sm font-medium transition-all ${
            editor.isActive("bulletList")
              ? "bg-[#E63946] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
          }`}
          title="Lista com bullets"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-9 w-9 flex items-center justify-center rounded text-sm font-medium transition-all ${
            editor.isActive("orderedList")
              ? "bg-[#E63946] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
          }`}
          title="Lista numerada"
        >
          1.
        </button>
      </div>
      <div className="p-4 min-h-40">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none [&_p]:text-gray-900 [&_ul]:text-gray-900 [&_ol]:text-gray-900 [&_li]:text-gray-900"
        />
      </div>
    </div>
  );
}

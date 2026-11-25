'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Undo,
  Redo,
} from 'lucide-react';

interface BlogEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#C9A24B] underline hover:text-[#E8C872]',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none min-h-[300px] p-4 text-xs sm:text-sm text-[#FAF7F0] focus:outline-none leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-[#333] rounded-lg overflow-hidden bg-[#181818]">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#1C1B1B] border-b border-[#2A2A2A]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bold')
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Bold"
        >
          <Bold size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('italic')
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Italic"
        >
          <Italic size={14} />
        </button>

        <div className="w-[1px] h-4 bg-[#333] mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Heading 2"
        >
          <Heading2 size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Heading 3"
        >
          <Heading3 size={14} />
        </button>

        <div className="w-[1px] h-4 bg-[#333] mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Bullet List"
        >
          <List size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Ordered List"
        >
          <ListOrdered size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Blockquote"
        >
          <Quote size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]"
          title="Divider"
        >
          <Minus size={14} />
        </button>

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('link')
              ? 'bg-[#C9A24B] text-[#0B0B0B]'
              : 'text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]'
          }`}
          title="Add Link"
        >
          <LinkIcon size={14} />
        </button>

        <div className="w-[1px] h-4 bg-[#333] mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]"
          title="Undo"
        >
          <Undo size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded text-[#9A8F7E] hover:text-[#FAF7F0] hover:bg-[#252525]"
          title="Redo"
        >
          <Redo size={14} />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}

'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
    Heading2, Heading3, Link as LinkIcon, Minus, RotateCcw, RotateCw
} from 'lucide-react';

interface Props {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

function ToolbarBtn({ active, onClick, title, children }: {
    active?: boolean; onClick: () => void; title: string; children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onMouseDown={e => { e.preventDefault(); onClick(); }}
            title={title}
            className={`p-1.5 rounded transition-colors ${active ? 'bg-[#1ADB04] text-black' : 'text-zinc-300 hover:bg-zinc-700'}`}
        >
            {children}
        </button>
    );
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
    const editor = useEditor({ immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'min-h-[200px] outline-none prose prose-invert prose-sm max-w-none px-4 py-3',
            },
        },
    });

    // Sync external value changes (e.g. on fetch)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function setLink() {
        const url = window.prompt('URL', editor?.getAttributes('link').href ?? '');
        if (url === null) return;
        if (url === '') { editor?.chain().focus().unsetLink().run(); return; }
        editor?.chain().focus().setLink({ href: url }).run();
    }

    if (!editor) return null;

    const ic = 'w-4 h-4';

    return (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-0.5 p-2 border-b border-zinc-700 bg-zinc-900">
                <ToolbarBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><Bold className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><Italic className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><UnderlineIcon className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><Strikethrough className={ic} /></ToolbarBtn>

                <span className="w-px bg-zinc-700 mx-1" />

                <ToolbarBtn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2"><Heading2 className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3"><Heading3 className={ic} /></ToolbarBtn>

                <span className="w-px bg-zinc-700 mx-1" />

                <ToolbarBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list"><List className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list"><ListOrdered className={ic} /></ToolbarBtn>

                <span className="w-px bg-zinc-700 mx-1" />

                <ToolbarBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align left"><AlignLeft className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align center"><AlignCenter className={ic} /></ToolbarBtn>
                <ToolbarBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align right"><AlignRight className={ic} /></ToolbarBtn>

                <span className="w-px bg-zinc-700 mx-1" />

                <ToolbarBtn active={editor.isActive('link')} onClick={setLink} title="Link"><LinkIcon className={ic} /></ToolbarBtn>
                <ToolbarBtn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider"><Minus className={ic} /></ToolbarBtn>

                <span className="w-px bg-zinc-700 mx-1" />

                <ToolbarBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo"><RotateCcw className={ic} /></ToolbarBtn>
                <ToolbarBtn active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo"><RotateCw className={ic} /></ToolbarBtn>
            </div>

            {/* Editor area */}
            <div className="relative text-white text-sm leading-relaxed">
                {editor.isEmpty && placeholder && (
                    <span className="absolute top-3 left-4 text-zinc-500 pointer-events-none select-none">{placeholder}</span>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

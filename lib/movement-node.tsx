'use client';

import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

export const MovementNode = Node.create({
  name: 'movement',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      name: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-movement]',
        getAttrs: (dom) => ({
          id: (dom as HTMLElement).getAttribute('data-id'),
          name: (dom as HTMLElement).getAttribute('data-name'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-movement': '', 'data-id': HTMLAttributes.id, 'data-name': HTMLAttributes.name }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MovementNodeView);
  },
});

function MovementNodeView({ node, deleteNode }: NodeViewProps) {
  return (
    <NodeViewWrapper as="span" contentEditable={false}>
      <span className="movement-tag">
        {(node.attrs as { name: string }).name}
        <button
          type="button"
          onClick={() => deleteNode()}
          className="movement-delete-btn"
          aria-label="Remove movimento"
        >
          ×
        </button>
      </span>
    </NodeViewWrapper>
  );
}

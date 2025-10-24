'use client';

import { Plus, Undo2, Redo2, Save, Download } from 'lucide-react';
import type { ToolbarProps } from '@/types';

export default function Toolbar({
  onAddText,
  onUndo,
  onRedo,
  onSave,
  onDownload,
  canUndo,
  canRedo,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
      <button
        type="button"
        onClick={onAddText}
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Text
      </button>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
          Undo
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
          Redo
        </button>
      </div>

      <div className="ml-auto flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 rounded-lg bg-success-600 hover:bg-success-700 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-success-500/50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-500/50 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}

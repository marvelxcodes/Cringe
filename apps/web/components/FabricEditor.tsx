'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, FabricImage, IText, util } from 'fabric';
import { Plus, Undo2, Redo2, Trash2, Save, Download } from 'lucide-react';
import type { FabricEditorProps } from 'types';

export default function FabricEditor({ initialImageUrl, onSave, onExport }: FabricEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const isRedoUndoRef = useRef(false);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 800,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = canvas;

    // Track canvas changes for history
    const handleObjectModified = () => {
      if (!isRedoUndoRef.current) {
        // Use setTimeout to ensure the state is saved after the current operation completes
        setTimeout(() => saveHistory(), 50);
      }
    };

    const handleObjectAdded = () => {
      if (!isRedoUndoRef.current) {
        // Use setTimeout to ensure the state is saved after the current operation completes
        setTimeout(() => saveHistory(), 50);
      }
    };

    const handleObjectRemoved = () => {
      if (!isRedoUndoRef.current) {
        // Use setTimeout to ensure the state is saved after the current operation completes
        setTimeout(() => saveHistory(), 50);
      }
    };

    canvas.on('object:modified', handleObjectModified);
    canvas.on('object:added', handleObjectAdded);
    canvas.on('object:removed', handleObjectRemoved);

    // Load initial image
    if (initialImageUrl) {
      FabricImage.fromURL(initialImageUrl, {
        crossOrigin: 'anonymous',
      }).then((img) => {
        if (!img || !canvas) return;

        // Scale image to fit canvas
        const scale = Math.min(
          canvas.width! / (img.width || 1),
          canvas.height! / (img.height || 1)
        );

        img.set({
          scaleX: scale,
          scaleY: scale,
          selectable: false,
        });

        canvas.add(img);
        canvas.centerObject(img);
        canvas.sendObjectToBack(img);
        canvas.renderAll();

        // Save initial state
        setTimeout(() => {
          saveHistory();
          setIsReady(true);
        }, 100);
      });
    } else {
      // Save initial empty state
      setTimeout(() => {
        saveHistory();
        setIsReady(true);
      }, 100);
    }

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [initialImageUrl]);

  // Save canvas state to history
  const saveHistory = useCallback(() => {
    if (!fabricCanvasRef.current || isRedoUndoRef.current) return;

    const json = JSON.stringify(fabricCanvasRef.current.toJSON());
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(json);
      return newHistory;
    });
    setHistoryStep((prev) => prev + 1);
  }, [historyStep]);

  // Add text to canvas
  const addText = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const text = new IText('Your Text Here', {
      left: 100,
      top: 100,
      fontSize: 48,
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    });

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
    // History will be saved automatically via the 'object:added' event
  }, []);

  // Undo
  const undo = useCallback(() => {
    if (!fabricCanvasRef.current || historyStep <= 0 || history.length === 0) return;

    const prevStep = historyStep - 1;
    const prevState = history[prevStep];

    if (!prevState) return;

    isRedoUndoRef.current = true;
    
    fabricCanvasRef.current.loadFromJSON(prevState, () => {
      fabricCanvasRef.current?.renderAll();
      setHistoryStep(prevStep);
      isRedoUndoRef.current = false;
    });
  }, [history, historyStep]);

  // Redo
  const redo = useCallback(() => {
    if (!fabricCanvasRef.current || historyStep >= history.length - 1) return;

    const nextStep = historyStep + 1;
    const nextState = history[nextStep];

    if (!nextState) return;

    isRedoUndoRef.current = true;

    fabricCanvasRef.current.loadFromJSON(nextState, () => {
      fabricCanvasRef.current?.renderAll();
      setHistoryStep(nextStep);
      isRedoUndoRef.current = false;
    });
  }, [history, historyStep]);

  // Export canvas as Blob
  const exportCanvas = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!fabricCanvasRef.current) {
        resolve(null);
        return;
      }

      fabricCanvasRef.current.discardActiveObject();
      fabricCanvasRef.current.renderAll();

      canvasRef.current?.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }, []);

  // Handle save
  const handleSave = useCallback(async () => {
    const blob = await exportCanvas();
    if (blob && onSave) {
      onSave(blob);
    }
  }, [exportCanvas, onSave]);

  // Handle download
  const handleDownload = useCallback(async () => {
    const blob = await exportCanvas();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meme-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);

      if (onExport) {
        onExport(blob);
      }
    }
  }, [exportCanvas, onExport]);

  // Delete selected object
  const deleteSelected = useCallback(() => {
    if (!fabricCanvasRef.current) return;

    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current.remove(activeObject);
      fabricCanvasRef.current.renderAll();
      // History will be saved automatically via the 'object:removed' event
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete/Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && !((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA')) {
        deleteSelected();
      }
      // Ctrl/Cmd + Z (Undo)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y (Redo)
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, undo, redo]);

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={addText}
          disabled={!isReady}
          className="px-4 py-2.5 text-sm rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Text</span>
        </button>

        <div className="flex gap-2 sm:border-l sm:border-gray-200 dark:sm:border-gray-700 sm:pl-3">
          <button
            type="button"
            onClick={undo}
            disabled={historyStep <= 0}
            className="px-4 py-2.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={historyStep >= history.length - 1}
            className="px-4 py-2.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={deleteSelected}
          disabled={!isReady}
          className="px-4 py-2.5 text-sm rounded-lg bg-error-50 dark:bg-error-900/20 hover:bg-error-100 dark:hover:bg-error-900/30 text-error-600 dark:text-error-400 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>

        <div className="ml-auto flex gap-2">
          {onSave && (
            <button
              type="button"
              onClick={handleSave}
              disabled={!isReady}
              className="px-4 py-2.5 text-sm rounded-lg bg-success-600 hover:bg-success-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleDownload}
            disabled={!isReady}
            className="px-4 py-2.5 text-sm rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex justify-center mb-4 sm:mb-6 overflow-x-auto">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 max-w-full">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* Tips */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-xl p-4 sm:p-6 text-center">
        <div className="space-y-2">
          <p className="text-brand-900 dark:text-brand-100 text-xs sm:text-sm font-medium">
            💡 <span className="font-semibold">Pro Tips:</span>
          </p>
          <p className="text-brand-700 dark:text-brand-300 text-xs sm:text-sm">
            Click text to edit • Drag to move • Use corners to resize • Delete key to remove
          </p>
          <p className="text-brand-600 dark:text-brand-400 text-[10px] sm:text-xs">
            Shortcuts: <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white dark:bg-gray-800 rounded border border-brand-200 dark:border-brand-700 text-[10px] sm:text-xs">Ctrl+Z</kbd> Undo •{' '}
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white dark:bg-gray-800 rounded border border-brand-200 dark:border-brand-700 text-[10px] sm:text-xs">Ctrl+Y</kbd> Redo •{' '}
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white dark:bg-gray-800 rounded border border-brand-200 dark:border-brand-700 text-[10px] sm:text-xs">Delete</kbd> Remove
          </p>
        </div>
      </div>
    </div>
  );
}

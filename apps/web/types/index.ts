// Database Types
export interface Template {
  id: string;
  name: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Meme {
  id: string;
  user_id: string | null;
  prompt: string;
  image_url: string;
  template_id: string;
  created_at: string;
}

// API Request/Response Types
export interface GenerateMemeRequest {
  prompt: string;
  templateUrl: string;
}

export interface GenerateMemeResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface SaveMemeRequest {
  prompt: string;
  imageBlob: Blob;
  templateId: string;
  userId?: string;
}

export interface SaveMemeResponse {
  success: boolean;
  memeId?: string;
  imageUrl?: string;
  error?: string;
}

export interface TemplatesResponse {
  success: boolean;
  templates?: Template[];
  error?: string;
}

// Fabric.js Editor Types
export interface FabricEditorProps {
  initialImageUrl: string;
  onSave?: (imageBlob: Blob) => void;
  onExport?: (imageBlob: Blob) => void;
}

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
}

export interface TextOptions {
  text: string;
  fontSize: number;
  fill: string;
  fontFamily: string;
  fontWeight: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface FilterOptions {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
  grayscale?: boolean;
  sepia?: boolean;
}

// Component Props Types
export interface TemplateGridProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  selectedCategory?: string;
}

export interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export interface MemeCardProps {
  meme: Meme;
  onClick?: (meme: Meme) => void;
}

export interface ToolbarProps {
  onAddText: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onDownload: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// Utility Types
export type MemeCategory = 'funny' | 'wholesome' | 'dank' | 'trending' | 'custom';

export interface EditorHistory {
  past: string[];
  present: string;
  future: string[];
}

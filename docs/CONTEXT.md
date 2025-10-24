# Project: AI Meme Generator Web App

## Overview
Build a full-stack meme generator using **Next.js (App Router)**, **Fabric.js**, **Supabase**, **Bun**, and **Gemini API**.

Users can:
1. Choose a meme template from a predefined list (stored in Supabase).
2. Enter a prompt describing what meme they want.
3. The app sends the prompt + selected template to Gemini API.
4. Gemini API generates an updated meme image that reflects the prompt.
5. The image loads into a **Fabric.js-based editor** so users can make manual edits (text, stickers, filters, resizing, etc.).
6. Users can export or save the final meme to Supabase (images + metadata).

---

## Core Tech Stack
- **Next.js 15+ (App Router, TypeScript, React Server Components)**
- **Fabric.js** for in-browser meme editing (canvas manipulation)
- **Supabase**(MCP Available) for:
  - Storing meme templates
  - Storing generated memes (image + user metadata)
  - User authentication (optional)
- **Gemini API** (via REST or SDK) for AI-driven image generation
- **Bun** for ultra-fast dev and build

---

## App Flow
1. **Template Selection Page**
   - Fetch meme templates from Supabase (title, category, preview URL).
   - Display them in a grid with search & filter.
   - When user clicks a template → go to the generation page.

2. **Prompt-to-Image Generation Page**
   - User enters a text prompt.
   - On submit:
     - Call Gemini API with the template image URL + user prompt.
     - Get back a generated meme image (base64 or URL).
     - Render it inside a Fabric.js canvas.

3. **Editor Page (Fabric.js Integration)**
   - Allow users to:
     - Add text overlays (top/bottom captions)
     - Move, resize, and rotate text/images
     - Apply filters (brightness, contrast, grayscale)
     - Undo/redo
     - Export meme as PNG
   - Provide toolbar with:
     - “Add Text”
     - “Undo”
     - “Redo”
     - “Save to Supabase”
     - “Download Meme”

4. **Save & Share**
   - On save, upload final image (as Blob) to Supabase Storage.
   - Save metadata (prompt, template used, user_id, date) in Supabase DB.

---

## Data Schema (Supabase)
Tables:
1. **templates**
   - id (uuid)
   - name (text)
   - image_url (text)
   - category (text)
   - created_at (timestamp)

2. **memes**
   - id (uuid)
   - user_id (uuid)
   - prompt (text)
   - image_url (text)
   - template_id (uuid, foreign key)
   - created_at (timestamp)

---

## Gemini API Usage
- Use Gemini’s multimodal image generation endpoint.
- Input: JSON with `{ prompt, base_image_url }`.
- Output: AI-generated image (base64 or image URL).
- Store result in Supabase Storage and display in the Fabric.js canvas.

Example API function:
```ts
async function generateMeme(prompt: string, templateUrl: string) {
  const response = await fetch("/api/generate-meme", {
    method: "POST",
    body: JSON.stringify({ prompt, templateUrl }),
  });
  const data = await response.json();
  return data.imageUrl;
}
API Routes
/api/generate-meme → Calls Gemini API

/api/save-meme → Uploads to Supabase

/api/templates → Fetch templates

Components to Implement
TemplateGrid.tsx → Displays meme templates

PromptInput.tsx → Textbox + generate button

FabricEditor.tsx → Wrapper around Fabric.js

Toolbar.tsx → Editor actions (add text, save, export)

MemeCard.tsx → Display saved memes

Styling
Use TailwindCSS + shadcn/ui

Use soft glassy UI with minimal distraction

Editor should be responsive and mobile-friendly

Build Notes
Use Bun as package manager (bun install, bun run dev)

Use Supabase JS SDK for client operations

Use .env.local for API keys:

makefile
Copy code
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
# AI Meme Generator 🎨✨

A full-stack, AI-powered meme generator built with Next.js 15, Fabric.js, Supabase, and Google's Gemini AI.

## 🚀 Features

- **AI-Powered Generation**: Use Google's Gemini AI to generate witty meme captions
- **Interactive Editor**: Full-featured Fabric.js canvas editor with:
  - Text manipulation (add, edit, move, resize, rotate)
  - Undo/Redo functionality
  - Keyboard shortcuts
  - Real-time preview
- **Template Library**: Browse and filter meme templates by category
- **Cloud Storage**: Save and manage your memes with Supabase
- **Modern UI**: Beautiful glassy UI with smooth animations
- **TypeScript**: Fully typed for better developer experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Canvas Editor**: Fabric.js
- **AI**: Google Gemini API
- **Backend**: Supabase (Database + Storage)
- **Package Manager**: Bun

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ or Bun installed
- A Supabase account and project
- A Google AI Studio API key (for Gemini)

## 🔧 Quick Start

### 1. Install Dependencies

```bash
# From the monorepo root
bun install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `GEMINI_API_KEY` - Your Google Gemini API key

### 3. Set Up Database

Follow the instructions in [`/docs/DATABASE_SETUP.md`](/docs/DATABASE_SETUP.md) to:
- Create Supabase tables
- Set up storage bucket
- Seed sample templates

### 4. Run the Development Server

```bash
# From the monorepo root
bun run dev --filter=web

# The app will be available at http://localhost:3000
```

## 📖 Documentation

- **[Database Setup Guide](../../docs/DATABASE_SETUP.md)** - Complete Supabase setup instructions
- **[Tailwind v4 Setup](../../docs/TAILWIND_V4_SETUP.md)** - Tailwind CSS v4 configuration details
- **[Project Context](../../docs/CONTEXT.md)** - Original project specification

## 🎯 Usage

1. **Select a Template**: Browse the home page and click on a meme template
2. **Enter a Prompt**: Describe your meme idea (e.g., "Make this about Monday mornings")
3. **AI Generation**: Gemini will suggest meme text
4. **Edit in Canvas**: Use the Fabric.js editor to customize
5. **Save or Download**: Save to Supabase or download locally

### Editor Shortcuts

- **Add Text**: Click "Add Text" button
- **Undo**: `Ctrl/Cmd + Z`
- **Redo**: `Ctrl/Cmd + Y`
- **Delete**: `Delete` or `Backspace` key
- **Edit Text**: Double-click text objects

## 📁 Project Structure

```
apps/web/
├── app/
│   ├── api/              # API routes (Gemini & Supabase)
│   ├── generate/         # Meme generation page
│   ├── gallery/          # Saved memes gallery
│   └── page.tsx          # Home page (templates)
├── components/           # React components
├── lib/                  # Utilities and helpers
├── types/               # TypeScript type definitions
└── README.md
```

## 🔌 API Endpoints

- `GET /api/templates` - Fetch all meme templates
- `POST /api/generate-meme` - Generate meme text with AI
- `POST /api/save-meme` - Save meme to Supabase
- `GET /api/memes` - Fetch all saved memes

## 🐛 Troubleshooting

### Server Won't Start

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
bun install
```

### Tailwind Styles Not Working

See [Tailwind v4 Setup Guide](../../docs/TAILWIND_V4_SETUP.md) for configuration details.

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase RLS policies allow access
- Ensure storage bucket is public

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Next.js, Fabric.js, Supabase, and Gemini AI


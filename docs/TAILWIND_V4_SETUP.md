# Tailwind CSS v4 Setup Guide

This project uses **Tailwind CSS v4** with Next.js 15. The setup is different from Tailwind v3.

## What's Different in v4?

1. **No config file needed** - Configuration is done via CSS using `@theme`
2. **New PostCSS plugin** - Uses `@tailwindcss/postcss` instead of `tailwindcss` and `autoprefixer`
3. **CSS-first approach** - Import with `@import "tailwindcss"` instead of directives
4. **Automatic optimization** - Built-in autoprefixing and optimizations

## Installation

The following packages are installed:

```json
{
  "dependencies": {
    "tailwindcss": "^4.1.16",
    "@tailwindcss/postcss": "^4.1.16",
    "postcss": "^8.5.6"
  }
}
```

## Configuration Files

### `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

### `app/globals.css`

```css
@import "tailwindcss";

/* Custom theme configuration */
@theme {
  --color-background: #1a1a2e;
  --color-foreground: #ffffff;
  
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

## Custom Theme Variables

Tailwind v4 uses CSS variables for theming. Define them in the `@theme` block:

```css
@theme {
  /* Colors */
  --color-primary: #8b5cf6;
  --color-secondary: #ec4899;
  
  /* Fonts */
  --font-sans: system-ui, sans-serif;
  --font-mono: 'Courier New', monospace;
  
  /* Spacing */
  --spacing-tight: 0.5rem;
  --spacing-relaxed: 1.5rem;
}
```

Then use them in your classes:

```tsx
<div className="bg-primary text-foreground">
  Hello World
</div>
```

## No More tailwind.config.ts

Unlike v3, you **don't need** a `tailwind.config.ts` file. All configuration is done in CSS.

## Migration Notes

If you have an existing v3 project:

1. Remove `tailwind.config.ts`
2. Remove `autoprefixer` from dependencies
3. Install `@tailwindcss/postcss`
4. Update `postcss.config.js` to use the new plugin
5. Replace `@tailwind` directives with `@import "tailwindcss"`
6. Move theme customization to `@theme` blocks in CSS

## Running the App

```bash
# From the monorepo root
bun run dev --filter=web

# Or directly in the web folder
cd apps/web
bun run dev
```

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Next.js Integration Guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

## Troubleshooting

### "Unknown at rule @theme" Warning

This is a linter warning and can be safely ignored. The CSS will work correctly.

### Styles Not Applying

1. Check that `globals.css` is imported in `layout.tsx`
2. Verify `postcss.config.mjs` has the correct plugin
3. Clear `.next` folder: `rm -rf .next`
4. Restart the dev server

### Build Errors

If you see PostCSS errors:

```bash
# Reinstall dependencies
bun install

# Clear cache
rm -rf .next node_modules/.cache
```

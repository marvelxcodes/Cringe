# Vercel Deployment Guide

## Environment Variables Setup

To deploy this project on Vercel, you need to set the following environment variables in your Vercel project settings:

### Required Environment Variables

1. **GEMINI_API_KEY**
   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Required for meme generation functionality

2. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://your-project-id.supabase.co`

3. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Found in your Supabase project settings

4. **SUPABASE_SERVICE_ROLE_KEY** (Optional)
   - Service role key for server-side operations
   - Only needed for advanced database operations

## Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate values
5. Make sure to set them for all environments (Production, Preview, Development)

## Troubleshooting Build Issues

### Issue: "Missing from turbo.json" Warning
The `turbo.json` file has been updated to include all necessary environment variables. Make sure your Vercel environment variables match the names in the config.

### Issue: Database Connection Errors During Build
The database client has been updated to handle missing environment variables gracefully during build time. The app will use placeholder values during build and fail gracefully at runtime if not properly configured.

### Issue: API Routes Failing During Build
All API routes now use dynamic imports to avoid build-time database connection issues.

## Deployment Steps

1. Set up environment variables in Vercel
2. Connect your GitHub repository to Vercel
3. Deploy - the build should complete successfully
4. Test the deployed app to ensure all functionality works

## Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your environment variables
3. Run `bun run dev` to start development server

The app will work with mock data if Supabase is not configured, but you'll need the Gemini API key for meme generation.
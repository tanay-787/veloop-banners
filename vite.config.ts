import path from 'path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import cloudflareQuickTunnel from 'vite-plugin-cloudflare-quick-tunnel'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com', '.app.github.dev', '.githubpreview.dev'],
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    cloudflareQuickTunnel({
      cloudflaredArgs: ['--edge-ip-version', '4', '--protocol', 'http2'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})

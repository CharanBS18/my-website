import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'vaultshield-hero.js',
        chunkFileNames: 'vaultshield-hero-[name].js',
        assetFileNames: 'vaultshield-hero.[ext]',
      },
    },
  },
});

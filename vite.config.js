import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // the Vercel and Netlify workflows deploy build/, as CRA did
    outDir: 'build',
  },
});

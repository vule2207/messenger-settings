import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  base: '/cgwsp',
  // base: '/cgwsp/messenger-settings/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

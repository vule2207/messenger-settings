import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// base: '/levu2207/messenger-settings',

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

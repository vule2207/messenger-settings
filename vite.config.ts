import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// base: '/levu2207/messenger-settings',

// {
//   babel: {
//     plugins: ['babel-plugin-react-compiler'],
//   },
// }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

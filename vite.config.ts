import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// base: '/thanhvu/messenger-settings',

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
  base: '/thanhvu/messenger-settings',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

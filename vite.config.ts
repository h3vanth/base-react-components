import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ outDir: 'dist/types' })],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});

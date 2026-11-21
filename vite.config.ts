import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// GitHub Pages serves project sites from /<repo>/. Set BASE_PATH at build time
// (the deploy workflow does this automatically). Defaults to '/' locally.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.BASE_PATH ?? '/';

  return {
    base,
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              { displayName: mode !== 'production', fileName: false, pure: true },
            ],
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
            if (id.includes('node_modules/styled-components')) return 'styled';
            return undefined;
          },
        },
      },
    },
  };
});

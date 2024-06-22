// /// <reference types='vitest' />
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// export default defineConfig({
//   root: __dirname,
//   cacheDir: './node_modules/.vite/labkhata',

//   server: {
//     port: 4200,
//     host: 'localhost',
//   },

//   preview: {
//     port: 4300,
//     host: 'localhost',
//   },

//   plugins: [react(), nxViteTsPaths()],

//   // Uncomment this if you are using workers.
//   // worker: {
//   //  plugins: [ nxViteTsPaths() ],
//   // },

//   build: {
//     outDir: './dist/labkhata',
//     emptyOutDir: true,
//     reportCompressedSize: true,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },

//   test: {
//     watch: false,
//     globals: true,
//     cache: {
//       dir: './node_modules/.vitest/labkhata',
//     },
//     environment: 'jsdom',
//     include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

//     reporters: ['default'],
//     coverage: {
//       reportsDirectory: './coverage/labkhata',
//       provider: 'v8',
//     },
//   },
// });

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: __dirname,
    cacheDir: './node_modules/.vite/labkhata',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [react(), nxViteTsPaths()],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    build: {
      outDir: './dist/labkhata',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },

    test: {
      watch: false,
      globals: true,
      cache: {
        dir: './node_modules/.vitest/labkhata',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      reporters: ['default'],
      coverage: {
        reportsDirectory: './coverage/labkhata',
        provider: 'v8',
      },
    },

    // Inject environment variables
    define: {
      'process.env.NX_BACKEND_API_URL': JSON.stringify(env.NX_BACKEND_API_URL),
    },
  };
});
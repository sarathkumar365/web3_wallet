import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';


// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     esbuildOptions: {
//       // Node.js global to browser globalThis
//       define: {
//         global: 'globalThis',
//       },
//       // Enable only Buffer polyfill
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true,
//         }),
//       ],
//     },
//   },
// });

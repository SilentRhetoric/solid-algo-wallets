import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
    },
  },
  plugins: [
    solidPlugin(),
    {
      name: 'Replace env variables',
      transform(code, id) {
        if (id.includes('node_modules')) {
          return code
        }
        return code
          .replace(/process\.env\.SSR/g, 'false')
          .replace(/process\.env\.DEV/g, 'true')
          .replace(/process\.env\.PROD/g, 'false')
          .replace(/process\.env\.NODE_ENV/g, '"development"')
          .replace(/import\.meta\.env\.SSR/g, 'false')
          .replace(/import\.meta\.env\.DEV/g, 'true')
          .replace(/import\.meta\.env\.PROD/g, 'false')
          .replace(/import\.meta\.env\.NODE_ENV/g, '"development"')
      },
    },
    // nodePolyfills({
    //   // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
    //   include: ['module'],
    //   // Whether to polyfill specific globals.
    //   globals: {
    //     Buffer: true, // can also be 'build', 'dev', or false
    //     global: true,
    //     process: true,
    //   },
    //   // Whether to polyfill `node:` protocol imports.
    //   protocolImports: true,
    // }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})

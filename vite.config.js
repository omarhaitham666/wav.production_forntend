import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import postcss from 'postcss'
// import CompressionPlugin from 'compression-webpack-plugin'



export default defineConfig({
  optimizeDeps: {
    include: ["react-dropzone"],
  },
  build: {
    minify: 'esbuild',  
    sourcemap: false,  
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(
      {
        config: {
          purge: {
            content: ['./src/**/*.{js,jsx,ts,tsx}'],
            options: {
              safelist: ['dark-mode']
            }
          }
        }
      }
    ),
  ],
})

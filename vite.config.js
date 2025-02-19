import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'
import CompressionPlugin from 'compression-webpack-plugin'



export default defineConfig({
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

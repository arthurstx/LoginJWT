// tsup.config.ts
import { defineConfig } from 'tsup'
import path from 'node:path'

export default defineConfig({
  entry: ['src/api-vercel.ts'],
  outDir: 'dist',
  format: ['cjs'],
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  clean: true,
  treeshake: true,
  tsconfig: 'tsconfig.json',
  esbuildOptions(options) {
    // 👇 aqui sim funciona em qualquer tsup recente
    options.alias = {
      '@': path.resolve(__dirname, 'src'),
    }
  },
})

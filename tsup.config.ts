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
    // força o alias "@/..." => "<repo>/src"
    ;(options as any).alias = { '@': path.resolve(process.cwd(), 'src') }
  },
})

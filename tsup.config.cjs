// tsup.config.cjs (CJS)
const path = require('node:path')

module.exports = {
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  clean: true,
  treeshake: true,
  tsconfig: 'tsconfig.json',
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, 'src'),
    }
  },
}

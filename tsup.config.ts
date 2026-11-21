import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { 'react/index': 'src/react/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: false, // dist/ also holds the token and CSS builds
  target: 'es2020',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  // Components use hooks / browser APIs; mark them as client components for RSC (Next.js app router).
  banner: { js: '"use client";' },
});

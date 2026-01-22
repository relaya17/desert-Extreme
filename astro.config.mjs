import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // If you are deploying to a subdirectory, add it here:
  // base: '/my-repo-name',
  outDir: './dist',
  publicDir: './public',
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/portfolio/',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        github: resolve(__dirname, 'github.html'),
        youtube: resolve(__dirname, 'youtube.html'),
        articles: resolve(__dirname, 'articles.html'),
        uetips: resolve(__dirname, 'uetips.html'),
      },
    },
  },
});

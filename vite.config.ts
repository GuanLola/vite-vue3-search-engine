import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

interface IassetInfo {
  name: string;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/bilibili": {
        target: "https://api.bilibili.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bilibili/, ""),
        headers: {
          referer: "https://www.bilibili.com/",
          origin: "https://www.bilibili.com/",
        },
      },
      "/weibo": {
        target: "https://weibo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weibo/, ""),
        headers: {
          referer: "https://weibo.com",
          origin: "https://weibo.com",
        },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: IassetInfo) => {
          const info = assetInfo.name.split(".");
          let extType = info[info.length - 1];
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
          ) {
            extType = "media";
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = "img";
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = "fonts";
          }
          return `static/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
      },
    },
  },
});

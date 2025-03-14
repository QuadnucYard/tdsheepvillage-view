import { alert } from "@mdit/plugin-alert";
import { katex } from "@mdit/plugin-katex";
import tailwindcss from "@tailwindcss/vite";
import Vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import Markdown from "unplugin-vue-markdown/vite";
import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import circleDependency from "vite-plugin-circular-dependency";
import viteCompression from "vite-plugin-compression";


const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
        "~/": `${pathSrc}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: { additionalData: "@use '~/styles/element/index.scss' as *;" },
      },
    },
    plugins: [
      viteCompression(),

      Vue({
        include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
      }),

      vueJsx(),

      tailwindcss(),

      ElementPlus({
        useSource: true,
      }),

      Markdown({
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownItSetup(mdit) {
          mdit.use(alert, { alertNames: ["important", "note", "tip", "warning", "caution", "example"] });
          mdit.use(katex);
        },
      }),

      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        imports: ["vue", "vue-router"],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          IconsResolver({ prefix: "Icon" }),
        ],

        dts: "src/auto-imports.d.ts",
        eslintrc: { enabled: true },
      }),

      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [IconsResolver({ enabledCollections: ["ep", "mdi"] }), ElementPlusResolver({ importStyle: "sass" })],
        dts: "src/components.d.ts",
      }),

      Icons({
        autoInstall: true,
      }),

      circleDependency({}),

      //Inspect(),
    ],
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const a = id.toString().split("node_modules/");
              const name = a.at(-1)?.split("/")[0];
              return name;
              // if (big.includes(name)) return name;
              // else return "vendor";
            } else if (id.includes("/")) {
              if (id.includes("/src/assets/")) return "assets";
              // const m = id.match(/src\/(.+?)\//);
              // if (m) return m[1];
              return "index";
            }
            console.log("other", id);
          },
        },
      },
    },
  });

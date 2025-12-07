import react from "@vitejs/plugin-react-swc";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";

const env = loadEnv("mock", process.cwd(), "");

const basename = String(env.VITE_BASENAME || "/").replace(/(\/$)|(^\/)/g, "");

// https://vitejs.dev/config/
export default defineConfig({
    base: `/${basename}`,
    plugins: [
        react(),

        //create the 404.html to handle react router for github page
        {
            name: "404-html",
            async writeBundle(options) {
                const indexHtmlPath = resolve(options.dir || "", "index.html");
                const buildIndexHtmlPath = resolve(options.dir || "", "404.html");
                try {
                    const indexHtmlContent = await readFile(indexHtmlPath, "utf-8");
                    await writeFile(buildIndexHtmlPath, indexHtmlContent);
                } catch (error) {
                    console.error("Error duplicating index.html:", error);
                }
            },
        },
    ],
    server: {
        port: 3000,
    },
});

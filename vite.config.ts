import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

const env = loadEnv("mock", process.cwd(), "");

const basename = String(env.VITE_BASENAME || "/").replace(/(\/$)|(^\/)/g, "");

// https://vitejs.dev/config/
export default defineConfig({
    base: `/${basename}`,
    plugins: [react()],
    server: {
        port: 3000,
    },
});

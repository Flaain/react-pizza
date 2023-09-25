import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": process.env,
        VITE_BASE_URL: process.env.VITE_BASE_URL,
        VITE_SECOND_URL: process.env.VITE_SECOND_URL,
        VITE_THIRD_URL: process.env.VITE_THIRD_URL,
    },
});

import react from "@vitejs/plugin-react";
import "dotenv/config"
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});
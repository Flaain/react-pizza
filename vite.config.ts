import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": process.env,
        VITE_BASEURL: process.env.VITE_BASEURL,
        VITE_SECONDURL: process.env.VITE_SECONDURL,
        VITE_THIRDURL: process.env.VITE_THIRDURL,
    },
});
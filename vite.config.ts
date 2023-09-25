import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": process.env,
        BASE_URL: process.env.VITE_BASEURL,
        SECOND_URL: process.env.VITE_SECONDURL,
        THIRD_URL: process.env.VITE_THIRDURL,
    },
});
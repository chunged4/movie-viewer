import { defineConfig } from "vite";

export default defineConfig({
    // Other Vite configuration options...

    define: {
        "process.env": {
            VITE_TMDB_KEY: JSON.stringify(process.env.VITE_TMDB_KEY || ""),
        },
    },
});

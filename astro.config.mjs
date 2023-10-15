import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import { VitePWA } from "vite-plugin-pwa";
import { manifest } from "./utils/pwaConfig";

// https://astro.build/config
export default defineConfig({
    integrations: [preact()],
    site: "https://doinkythederp.github.io",
    base: "/fruitgame",
    vite: {
        plugins: [
            VitePWA({
                registerType: "autoUpdate",
                manifest,
                workbox: {
                    globDirectory: "dist",
                    globPatterns: [
                        "**/*.{html,js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
                    ],
                    // Don't fallback on document based (e.g. `/some-page`) requests
                    // This removes an errant console.log message from showing up.
                    navigateFallback: null,
                },
            }),
        ],
    },
});

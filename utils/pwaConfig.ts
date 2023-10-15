// Type imports
import type { ManifestOptions } from "vite-plugin-pwa";

/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
    baseURL: "https://doinkythederp.github.com/fruitgame", // Change this to your production URL.
    description: "fruit game lets you pop fruits. look for large groups!", // Change this to be your website's description.
    type: "website",
    image: {
        url: "/fruitgame/android-chrome-512x512.png", // Change this to your website's thumbnail.
        alt: "Watermelon icon", // Change this to your website's thumbnail description.
        width: 512,
        height: 512,
    },
    siteName: "fruit game", // Change this to your website's name,
    twitter: {
        card: "summary_large_image",
    } as const,
};

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
    name: seoConfig.siteName, // Change this to your website's name.
    short_name: seoConfig.siteName, // Change this to your website's short name.
    description: seoConfig.description, // Change this to your websites description.
    theme_color: "#e53c40", // Change this to your primary color.
    background_color: "#f5f5f5", // Change this to your background color.
    display: "standalone",
    icons: [
        {
            src: "/fruitgame/maskable-640x640.png",
            sizes: "640x640",
            type: "image/png",
            purpose: "maskable",
        },
        {
            src: "/fruitgame/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            src: "/fruitgame/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
        },
    ],
    scope: "/fruitgame/",
    start_url: "/fruitgame",
};

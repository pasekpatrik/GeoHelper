import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            devOptions: {
                enabled: true
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                cleanupOutdatedCaches: true,
            },

            includeAssets: ['earth.svg', 'earth-bg.png', 'robots.txt'],

            manifest: {
                name: 'GeoHelper',
                short_name: 'GeoHelper',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: 'earth-bg.png', 
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'earth-bg.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable' 
                    }
                ]
            }
        })
    ],
});
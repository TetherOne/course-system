import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import {
    viteHost,
    vitePort,
    djangoURL
} from '#config';


export default defineConfig({
    plugins: [vue()],
    server: {
        host: viteHost,
        port: vitePort,
        proxy: {
            '/api': {
                target: djangoURL,
                changeOrigin: true
            }
        }
    },
    optimizeDeps: {
        exclude: ['primevue']
    }
});
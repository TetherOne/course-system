import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import {
    frontHostName,
    frontPort,
    backURL
} from './src/config.js';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: frontHostName,
        port: frontPort,
        proxy: {
            '/api': {
                target: backURL,
                ws: true,
                changeOrigin: true
            }
        }
    }
});
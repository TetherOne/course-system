import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import {
    viteHost,
    vitePort,
    djangoURL
} from './src/config';


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
    resolve: {
        alias: {
            '#src': '/src',
            '#config': '/src/config.ts',
            '#types': "/src/models.ts",
            '#elements': '/src/components/elements',
            '#pages': '/src/components/pages',
            '#store': '/src/store.ts'
        },
        extensions: [
            ".ts",
            ".vue"
        ]
    },
    optimizeDeps: {
        exclude: ['primevue']
    }
});

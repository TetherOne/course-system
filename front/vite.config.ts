import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';



export default defineConfig({
    plugins: [vue()],
    server: {
        host: 'localhost',
        port: 8001,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
            }
        }
    },
    resolve: {
        extensions: [
            '.scss',
            '.ts',
            '.vue'
        ],
        alias: {
            '#src': '/src',
            '#enums': '/src/enums.ts',
            '#models': '/src/models.ts',
            '#types': '/src/types.ts',
            '#classes': '/src/classes',
            '#store': '/src/store.ts',
            '#router': '/src/router.ts',
            '#requests': '/src/requests.ts',
            '#pages': '/src/components/pages',
            '#elements': '/src/components/elements'
        }
    },
    build: {
        outDir: './../templates',
        assetsDir: 'static',
        emptyOutDir: true
    }
});
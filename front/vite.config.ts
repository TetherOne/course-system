import {
    fileURLToPath,
    URL
} from 'node:url';

import { createRequire } from 'node:module';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';



const require = createRequire(import.meta.url);



export default defineConfig({
    plugins: [
        vue(),
        ckeditor5({
            theme: require.resolve('@ckeditor/ckeditor5-theme-lark')
        })
    ],
    server: {
        host: 'localhost',
        port: 8001,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
            },
            '/media': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
            }
        }
    },
    resolve: {
        extensions: [
            '.css',
            '.scss',
            '.ts',
            '.vue'
        ],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '#src': '/src',
            '#styles': '/src/styles',
            '#enums': '/src/enums.ts',
            '#types': '/src/types.ts',
            '#classes': '/src/classes',
            '#functions': '/src/functions.ts',
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
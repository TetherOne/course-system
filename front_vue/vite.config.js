import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: 'localhost',
        port: 3010,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                ws: true,
                changeOrigin: true
            }
        }
    }
})
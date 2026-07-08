import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173,
        proxy: {
            '/api/auth': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api\/auth/, '')
            },
            '/api/election': {
                target: 'http://localhost:8082',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api\/election/, '')
            },
            '/api/vote': {
                target: 'http://localhost:8083',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api\/vote/, '')
            },
            '/api/audit': {
                target: 'http://localhost:8084',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api\/audit/, '')
            }
        }
    }
});

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Markdown from 'unplugin-vue-markdown/vite'
import markdownItAnchor from 'markdown-it-anchor'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
            template: {
                compilerOptions: {
                    whitespace: 'preserve',
                },
            },
        }),
        Markdown({
            markdownItSetup(md) {
                md.use(markdownItAnchor)
            },
        }),
    ],
    base: '/',
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.hdr'],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})

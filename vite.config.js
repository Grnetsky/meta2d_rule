import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {TDesignResolver} from 'unplugin-vue-components/resolvers';
import path from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        monacoEditorPlugin.default(),
        AutoImport({
            resolvers: [TDesignResolver({
                library: 'vue-next'
            })],
        }),
        Components({
            resolvers: [TDesignResolver({
                library: 'vue-next'
            })],
        }),],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            // '@meta2d': path.resolve(__dirname, '../meta2d.js/packages'),
        },
    },
})

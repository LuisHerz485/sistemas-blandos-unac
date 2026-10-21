import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2022',
        sourcemap: false,
        // Sin data: URIs para fuentes/imágenes, así la CSP puede ser estricta (font-src 'self').
        assetsInlineLimit: 0,
    },
    test: {
        environment: 'node',
        include: ['src/**/*.test.ts'],
    },
})

import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const { recommended: reactRecommended, 'jsx-runtime': reactJsxRuntime } = react.configs.flat
if (!reactRecommended || !reactJsxRuntime) {
    throw new Error('eslint-plugin-react no expone sus configuraciones flat')
}

export default tseslint.config(
    // Archivos generados, dependencias y artefactos de diseño.
    { ignores: ['dist/', 'node_modules/', '.impeccable/', '.netlify/', 'coverage/'] },

    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,

    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // Código de la aplicación (navegador + React).
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [
            reactRecommended,
            reactJsxRuntime,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: { globals: globals.browser },
        settings: { react: { version: 'detect' } },
        rules: {
            'react/prop-types': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
        },
    },

    // Archivos de configuración que corren en Node.
    {
        files: ['*.config.ts'],
        languageOptions: { globals: globals.node },
    },

    // Siempre al final: desactiva reglas de estilo que chocan con Prettier.
    prettier,
)

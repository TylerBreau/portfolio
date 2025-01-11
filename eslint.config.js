import globals from "globals";
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import js from "@eslint/js";
import tseslint from 'typescript-eslint';

export default [

    {
        ...js.configs.recommended,
        files: [ "./src/**/*.{ts,tsx}" ]
    },
    ...(tseslint.configs.recommended.map((config) => {
        return {
            ...config,
            files: [ "./src/**/*.{ts,tsx}" ]
        };
    })),
    {
        ...react.configs.flat.recommended,
        files: [ "./src/**/*.{ts,tsx}" ]
    },
    {
        ...react.configs.flat["jsx-runtime"],
        files: [ "./src/**/*.{ts,tsx}" ]
    },

    {
        files: [ "./src/**/*.{ts,tsx}" ],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true
            },
            globals: {
                ...globals.browser,
                ...globals.es2021
            }
        },
        parser: "@typescript-eslint/parser",
        plugins: {
            react: react,
            typescript: typescript
        },
        rules: {
            "semi": [2, "always"],
            "indent": ["error", 4]
        },
        settings: {
            react: {
                version: "detect"
            },
            "import/resolver": {
                webpack: {}
            }
        }
    }
]

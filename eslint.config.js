import globals from "globals";
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import js from "@eslint/js";
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: [
            ".config/**",
            "webpack.config.cjs",
            "www",
            "node_modules"
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
        {
        ...react.configs.flat.recommended,
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    {
        ...react.configs.flat["jsx-runtime"],
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    {
        files: [ "./src/**/*.{ts,tsx}" ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021
            }
        },
        plugins: {
            react: react,
            typescript: typescript
        },
        rules: {
            "semi": [2, "always"],
            "indent": ["error", 4, { SwitchCase: 1 }],
            "@typescript-eslint/no-empty-object-type": "off",
            "prefer-const": "off"
        },
        settings: {
            "import/resolver": {
                webpack: {}
            }
        }
    }
]

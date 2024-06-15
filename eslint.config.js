import simpleImportSort from 'eslint-plugin-simple-import-sort';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Side effect imports.
                        ['^\\u0000'],

                        // Node.js builtins prefixed with `node:`.
                        ['^node:'],

                        // Packages.
                        ['^\\w'],

                        // Packages prefixed with `@`.
                        ['^@\\w'],

                        // Relative imports.
                        ['^\\.'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
    },
]);

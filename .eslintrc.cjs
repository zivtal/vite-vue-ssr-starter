module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-strongly-recommended', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier',],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['**/node_modules/**', '**/dist/**'],
    rules: 
        {
        'max-lines': ['error', {max: 500, skipBlankLines: true}],
        'max-len': ['error', 150, {ignorePattern: '^import .*'}],
        'vue/attributes-order': ['error', {
            order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', ['UNIQUE', 'SLOT'], 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'CONTENT', 'EVENTS',],
            alphabetical: false,
        },],
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'error',
        'vue/no-deprecated-slot-attribute': 'off',
        'no-debugger': 'warn',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './client'], ['@assets', './client/assets'], ['@router', './client/router'], ['@shared', './client/shared'], ['@styles', './client/styles'], ['@views', './client/views'], ['@locale', './client/locale'], ['@components', './client/shared/components'],],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            },
        },
    },
};

module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        // Note: you must disable the base rule as it can report incorrect errors
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
    },
};

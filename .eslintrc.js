module.exports = {
  env: { es2021: true, node: true, jest: true },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-eval': ['error'],
    'no-implied-eval': ['error'],
    'no-param-reassign': ['error'],
    'no-redeclare': ['error'],
    'no-undef': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unused-vars': ['error'],
    'no-use-before-define': ['error', { functions: true, classes: true, variables: false }],
    'no-var': ['error'],
    'prefer-const': ['error'],
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'spaced-comment': ['error', 'always']
  }
};

module.exports = {
  env: { es2022: true, node: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-native/all',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'react-native', 'prettier', 'import'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    eqeqeq: ['error'],
    complexity: ['error', 10],
    curly: ['error', 'all'],
    'import/no-default-export': ['error'],
    'max-params': ['error'],
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
    'prettier/prettier': ['error'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }
    ],
    'react/jsx-boolean-value': ['error'],
    'react/jsx-curly-brace-presence': ['error'],
    'react/jsx-filename-extension': ['off', { props: 'never', children: 'never' }],
    'react/jsx-no-undef': ['error'],
    'react/jsx-no-useless-fragment': ['error'],
    'react/no-typos': ['error'],
    'react/no-unused-prop-types': ['error'],
    'react/prop-types': ['error'],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/sort-comp': ['error'],
    'spaced-comment': ['error', 'always']
  }
};

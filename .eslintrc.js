const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  plugins: ['prettier', 'import', '@typescript-eslint', 'react'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
    },
  },
  rules: {
    'prettier/prettier': ERROR,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeature: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    jest: true,
    node: true,
    es2017: true,
  },
}

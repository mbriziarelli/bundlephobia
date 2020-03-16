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
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ERROR,
    'react/prop-types': OFF,
    'import/no-unresolved': [
      ERROR,
      { ignore: ['bundlephobia-errors', 'bundlephobia-suggestions-service'] },
    ],
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

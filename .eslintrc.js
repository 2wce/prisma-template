module.exports = {
  env: {
    browser: false,
    es2021: true,
    "cypress/globals": true
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:cypress/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'cypress'],
  rules: {
    'no-console': 'off',
    'max-len': ['error', { code: 120 }],
    'arrow-body-style': ['error', 'always'],
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error"
  },
};

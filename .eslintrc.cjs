module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true, // 如果不加，.eslintrc.js报错'module' is not defined.eslint(no-undef)
  },
  extends: [
    'eslint:recommended',
    // 为 TypeScript 代码库提供 lint 规则（会修改eslint:recommended的一些规则）
    'plugin:@typescript-eslint/recommended',
    // 包含了 eslint-config-prettier 和 eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', //关闭any类型警告
  },
};

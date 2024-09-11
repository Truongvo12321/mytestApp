module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended', // Tích hợp Prettier vào ESLint
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': 'error', // Báo lỗi nếu mã không đúng quy tắc Prettier
      'react/react-in-jsx-scope': 'off', // Tắt quy tắc yêu cầu import React trong JSX (React 17+)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Cảnh báo biến không sử dụng
      'no-console': 'warn', // Cảnh báo việc sử dụng console.log
    },
  };
  
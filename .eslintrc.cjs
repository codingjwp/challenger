module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // 타입스크립트 추천 룰셋
    'plugin:react-hooks/recommended', // 리액트 훅 추천 룰셋
    'plugin:prettier/recommended', // eslint에 prettier 추가 및 충돌 규칙 비활성화 // prettier/prettier 자동 적용
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

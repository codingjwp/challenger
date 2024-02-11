module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // 타입스크립트 추천 룰셋
    'plugin:react-hooks/recommended', // 리액트 훅 추천 룰셋
    'plugin:prettier/recommended', // eslint에 prettier 추가 및 충돌 규칙 비활성화 // prettier/prettier 자동 적용
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'], // 직접 규칙을 적용할 경우 사용
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [ // 별도의 폴더나 파일등에만 규칙을 지정하고 싶을때 사용
    {
      files: ['**/__tests__/**/*. [jt]s? (x)', '**/? (*.)+ (spec|test). [jt]s? (x)'], // __test__ 폴더와 spec, test 가 존재하는 파일만
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],// 해당 규칙을 적용
    }
  ],
}

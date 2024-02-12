# Challenger

## 만들 페이지 및 컴포넌트

### 페이지

ScrollMainPage : 메인으로 스크롤로 작동하는 페이지 3장 정도 생각중
ChellgePage : Challenger 리스트, 성공, 실패, 생성, 수정,
Dashboard : 도전한 챌린지 수량, 시간, 실패한 이유 
Notfound: 빈공간

### 컴포넌트

Header
Navigation
Tabs
Button
Input
Modal



## prettier

```bash
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

## testing react typescript

`@testing-library/react-hooks`는 react 18버전 부터 `@testing-library/react`에 포함되어 추가 안했습니다.

```bash
yarn add -D jest ts-jest @types/jest 
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

```
 Validation Error:

  Test environment jest-environment-jsdom cannot be found. Make sure the testEnvironment configuration option points to an existing node module.

  Configuration Documentation:
  https://jestjs.io/docs/configuration


As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.
error Command failed with exit code 1.
```

```bash
yarn add -D jest-environment-jsdom
```
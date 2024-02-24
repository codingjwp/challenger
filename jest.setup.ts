import '@testing-library/jest-dom';

jest.mock('@/util/http', () => {
  return {
    URL: 'http://localhost:8080',
  };
});

jest.mock('@util/viewData', () => {
  return {
    TAB_ITEMS: [
      {
        id: 'challenge',
        label: '도전',
      },
      {
        id: 'success',
        label: '성공',
      },
      {
        id: 'failure',
        label: '실패',
      },
    ],
  };
});

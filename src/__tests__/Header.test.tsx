import {act, render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {exampleRouter} from './exampleRouter';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

/**
 * describe 테스트 환경 그룹
 * test 테스트 환경
 * 1. title props를 적용했을때 해당 텍스트가 존재하는지 여부 판단
 * 2. title props를 다른 내용을 적용했을때 해당 텍스트가 존재 안하는지 여부 판단
 * 3. link로 Dashboard 클릭 시 경로 /dashboard 이동
 */

jest.mock('@/util/http', () => {
  return {
    URL: 'http://localhost:8080',
  };
});

describe('Header 컴포넌트', () => {
  test('Challenger 타이틀 표시', async () => {
    const queryClient = new QueryClient();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signin'],
      });
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={headerRouter} />
        </QueryClientProvider>,
      );
    });

    const titleText = screen.getByText('Challenger');
    expect(titleText).toBeInTheDocument();
  });

  test('Challenger signin 경로경우 nav 표시 안되는지 테스트', async () => {
    const queryClient = new QueryClient();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signin'],
      });
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={headerRouter} />
        </QueryClientProvider>,
      );
    });
    const challenge = screen.queryByText(/챌린지/i);
    const dashboard = screen.queryByText(/프로필/i);

    expect(challenge).toBeNull();
    expect(dashboard).toBeNull();
  });

  test('Challenger signup 경로경우 nav 표시 안되는지 테스트', async () => {
    const queryClient = new QueryClient();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signup'],
      });
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={headerRouter} />
        </QueryClientProvider>,
      );
    });

    const challenge = screen.queryByText(/챌린지/i);
    const dashboard = screen.queryByText(/프로필/i);

    expect(challenge).toBeNull();
    expect(dashboard).toBeNull();
  });

  test('Challenger signin 경로에서 회원가입 클릭시 signup으로 이동', async () => {
    const user = userEvent.setup();
    const queryClient = new QueryClient();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signin'],
      });
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={headerRouter} />
        </QueryClientProvider>,
      );
    });

    const btnLinks = screen.getAllByRole('button');
    btnLinks.forEach(async (btn) => {
      const isBtnText = await screen.findByText('회원가입');
      if (isBtnText) {
        await user.click(btn);
        const signupTitle = await screen.findByText(/signup/i);
        expect(signupTitle).toBeInTheDocument();
        return;
      }
    });
  });

  test('Challenger signup 경로에서 로그인 화면 클릭시 signin으로 이동', async () => {
    const user = userEvent.setup();
    const queryClient = new QueryClient();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signup'],
      });
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={headerRouter} />
        </QueryClientProvider>,
      );
    });

    const btnLinks = screen.getAllByRole('button');
    btnLinks.forEach(async (btn) => {
      const isBtnText = await screen.findByText('로그인 화면');
      if (isBtnText) {
        await user.click(btn);
        const signupTitle = await screen.findByText(/signup/i);
        expect(signupTitle).toBeInTheDocument();
        return;
      }
    });
  });

  afterEach(() => {
    jest.resetModules();
  });
});

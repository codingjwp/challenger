import {act, render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {exampleRouter, wrapper} from '../exampleRouter';
import userEvent from '@testing-library/user-event';

describe('Header 컴포넌트', () => {
  it('Challenger 타이틀 표시', async () => {
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signin'],
      });
      render(<RouterProvider router={headerRouter} />, {wrapper});
    });

    const titleText = screen.getByText('Challenger');
    expect(titleText).toBeInTheDocument();
  });

  it('Challenger signin 경로경우 nav 표시 안되는지 테스트', async () => {
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signin'],
      });
      render(<RouterProvider router={headerRouter} />, {wrapper});
    });
    const challenge = screen.queryByText(/챌린지/i);
    const dashboard = screen.queryByText(/프로필/i);

    expect(challenge).toBeNull();
    expect(dashboard).toBeNull();
  });

  it('Challenger signup 경로경우 nav 표시 안되는지 테스트', async () => {
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signup'],
      });
      render(<RouterProvider router={headerRouter} />, {wrapper});
    });

    const challenge = screen.queryByText(/챌린지/i);
    const dashboard = screen.queryByText(/프로필/i);

    expect(challenge).toBeNull();
    expect(dashboard).toBeNull();
  });

  it('Challenger signin 경로에서 회원가입 클릭시 signup으로 이동', async () => {
    const user = userEvent.setup();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signin'],
      });
      render(<RouterProvider router={headerRouter} />, {wrapper});
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

  it('Challenger signup 경로에서 로그인 화면 클릭시 signin으로 이동', async () => {
    const user = userEvent.setup();
    await act(async () => {
      const headerRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/signup'],
      });
      render(<RouterProvider router={headerRouter} />, {wrapper});
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
});

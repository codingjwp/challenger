import Header from '../components/Header';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryRouter, Outlet, RouterProvider} from 'react-router-dom';

/**
 * describe 테스트 환경 그룹
 * test 테스트 환경
 * 1. title props를 적용했을때 해당 텍스트가 존재하는지 여부 판단
 * 2. title props를 다른 내용을 적용했을때 해당 텍스트가 존재 안하는지 여부 판단
 * 3. link로 Dashboard 클릭 시 경로 /dashboard 이동
 */
describe('Header 컴포넌트', () => {
  const routerConfig = (title: string, path = '/') => {
    return [
      {
        path: path,
        element: (
          <div>
            <Header title={title} />
            <Outlet />
          </div>
        ),
        children: [
          {
            index: true,
            element: <div>Main Page</div>,
          },
          {
            path: 'dashboard',
            element: <div>Dashboard page</div>,
          },
        ],
      },
    ];
  };

  test('Challenger 타이틀 표시', () => {
    const headerRouter = createMemoryRouter(routerConfig('Challenger'), {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={headerRouter} />);

    const titleText = screen.getByText('Challenger');
    expect(titleText).toBeInTheDocument();
  });

  test('New로 입력 Challenger로 찾을시 존재하지 않는지 여부 판단', () => {
    const headerRouter = createMemoryRouter(routerConfig('New'), {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={headerRouter} />);

    const titleText = screen.queryByText('Challenger');
    expect(titleText).toBeNull();
  });

  test('Link DashBoard 클릭 시 경로 dashboard 이동', async () => {
    const user = userEvent.setup();
    const headerRouter = createMemoryRouter(routerConfig('Challenger'), {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={headerRouter} />);
    const mainElement = screen.getByText(/main page/i);
    expect(mainElement).toBeInTheDocument();

    const linkElement = screen.getByText('DashBoard');
    await user.click(linkElement);
    const dashboardElement = await screen.findByText(/dashboard page/i);
    expect(dashboardElement).toBeInTheDocument();
  });
});

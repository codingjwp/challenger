import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {exampleRouter} from './exampleRouter';

/**
 * describe 테스트 환경 그룹
 * test 테스트 환경
 * 1. title props를 적용했을때 해당 텍스트가 존재하는지 여부 판단
 * 2. title props를 다른 내용을 적용했을때 해당 텍스트가 존재 안하는지 여부 판단
 * 3. link로 Dashboard 클릭 시 경로 /dashboard 이동
 */
describe('Header 컴포넌트', () => {
  test('Challenger 타이틀 표시', () => {
    const headerRouter = createMemoryRouter(exampleRouter, {
      initialEntries: ['/challenge'],
    });
    render(<RouterProvider router={headerRouter} />);

    const titleText = screen.getByText('Challenger');
    expect(titleText).toBeInTheDocument();
  });

  test('Challenger로 입력 New로 찾을시 존재하지 않는지 여부 판단', () => {
    const headerRouter = createMemoryRouter(exampleRouter, {
      initialEntries: ['/challenge'],
    });
    render(<RouterProvider router={headerRouter} />);

    const titleText = screen.queryByText('New');
    expect(titleText).toBeNull();
  });

  test('Link DashBoard 클릭 시 경로 dashboard 이동', async () => {
    const user = userEvent.setup();
    const headerRouter = createMemoryRouter(exampleRouter, {
      initialEntries: ['/challenge'],
    });
    render(<RouterProvider router={headerRouter} />);
    const mainElement = screen.getByText(/challenge page/i);
    expect(mainElement).toBeInTheDocument();

    const linkElement = screen.getByText('DashBoard');
    await user.click(linkElement);
    const dashboardElement = await screen.findByText(/dashboard page/i);
    expect(dashboardElement).toBeInTheDocument();
  });
});

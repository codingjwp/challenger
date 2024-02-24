import {RouterProvider, createMemoryRouter} from 'react-router-dom';
import {Router as RemixRouter} from '@remix-run/router';
import {exampleRouter} from '../exampleRouter';
import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ScrollView 컴포넌트', () => {
  it('ScrollView viewContent 값 확인', async () => {
    await act(async () => {
      const scrollViewRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/'],
      });
      render(<RouterProvider router={scrollViewRouter} />);
    });

    const viewItemFirstText = screen.getByText('도전할 준비가 되셨나요?');
    const viewItemSecondText = screen.getByText(
      '미래를 대비하실 준비가 되어 계신가요?',
    );
    const viewItemThirdText = screen.getByText(
      '앞으로 나아가기 위한 준비를 마치셨나요?',
    );

    expect(viewItemFirstText).toBeInTheDocument();
    expect(viewItemSecondText).toBeInTheDocument();
    expect(viewItemThirdText).toBeInTheDocument();
  });

  it('ScrollView button 클릭 시 경로 이동', async () => {
    const user = userEvent.setup();
    let scrollViewRouter: RemixRouter | null = null;
    await act(async () => {
      scrollViewRouter = createMemoryRouter(exampleRouter, {
        initialEntries: ['/'],
      });
      render(<RouterProvider router={scrollViewRouter} />);
    });
    const btnElement = screen.getAllByRole('button');
    btnElement.forEach(async (btn) => {
      await user.click(btn);
      const viewText = screen.queryByText(/CHALLENGER/i);
      expect(viewText).not.toBeNull();
      scrollViewRouter!.navigate(-1);
    });
  });
});

import {render, screen} from '@testing-library/react';
import ChallengeTabs from '@/components/ChallengeTabs';

describe('ChallengeTabs 컴포넌트', () => {
  it('렌더링후 표시되는 내용 테스트', () => {
    const counter = {
      challengeLength: 2,
      successLength: 4,
      failureLength: 1,
    };
    render(
      <ChallengeTabs
        tabIndex='challenge'
        counter={counter}
        onSelect={() => {}}
        onModalAction={() => {}}
      />,
    );
    const challenge = screen.getByText('도전');
    const success = screen.getByText('성공');
    const failed = screen.getByText('실패');

    expect(challenge).toBeInTheDocument();
    expect(success).toBeInTheDocument();
    expect(failed).toBeInTheDocument();
  });
  afterEach(() => jest.resetModules());
});

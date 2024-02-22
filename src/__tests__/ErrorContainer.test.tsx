import ErrorContainer from '@/components/ui/ErrorContainer';
import {render, screen} from '@testing-library/react';

test('ErrorContainer 컴포넌트 message 작성시 표시되는지 테스트', () => {
  const message = '테스트하는 메세지 입니다.';
  render(<ErrorContainer message={message} />);

  const titleText = screen.getByText(/error/i);
  const msgText = screen.getByText(message);

  expect(titleText).toBeInTheDocument();
  expect(msgText).toBeInTheDocument();
});

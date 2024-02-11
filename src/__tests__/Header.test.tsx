import Header from '../components/Header';
import {render} from '@testing-library/react';

describe('Header 컴포넌트', () => {
  test('Challenger 타이틀 표시', () => {
    render(<Header title='Challenger' />);
  });
});

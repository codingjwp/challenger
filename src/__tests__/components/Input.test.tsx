import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import {render, screen} from '@testing-library/react';

describe('Input 컴포넌트', () => {
  it('props을 입력 후 렌더링 테스트', () => {
    render(<Input type='text' id='nickname' content='닉네임' />);

    const input = screen.getByPlaceholderText('닉네임');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'nickname');
    expect(input).toHaveAttribute('name', 'nickname');
    expect(input).toHaveAttribute('placeholder', '닉네임');
  });
});

describe('Textarea 컴포넌트', () => {
  it('props을 입력 후 렌더링 테스트', () => {
    render(<Textarea id='description' content='설명' />);

    const input = screen.getByPlaceholderText('설명');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'description');
    expect(input).toHaveAttribute('name', 'description');
    expect(input).toHaveAttribute('placeholder', '설명');
  });
});

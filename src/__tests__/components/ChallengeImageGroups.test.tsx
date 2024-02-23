import ChallengeImageGroups from '@/components/ChallengeImageGroups';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ChallengeImageGroups 컴포넌트', () => {
  const list = [
    {
      id: 'challenge_img_01',
      imgSrc: '/assets/cooking.png',
      imgAlt: 'A man is cooking',
      type: 'cooking',
    },
    {
      id: 'challenge_img_02',
      imgSrc: '/assets/exercises.jpg',
      imgAlt: 'A woman is doing yoga',
      type: 'exercises',
    },
  ];
  it('props를 전달 후 렌더링 테스트', async () => {
    render(<ChallengeImageGroups list={list} imgLink='' onSelect={() => {}} />);

    const allImg = await screen.findAllByRole('img');
    allImg.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
  it('props에서 imgLink가 존재할 경우 테두리 색상 변환 테스트', async () => {
    const type = list[0].type;
    const imgSrc = list[0].imgSrc;
    render(
      <ChallengeImageGroups list={list} imgLink={imgSrc} onSelect={() => {}} />,
    );

    const allImg = await screen.findAllByRole('img');
    allImg.forEach((item) => {
      if (item.id === type) expect(item).toHaveClass('border-fuchsia-700');
      else expect(item).not.toHaveClass('border-fuchsia-700');
    });
  });

  it('props에서 img 태그 클릭 시 테두리 색상 변환 테스트', async () => {
    const user = userEvent.setup();
    const type = list[0].type;
    let imgSrc = '';
    const onSelect = jest.fn(() => (imgSrc = list[1].imgSrc));
    render(
      <ChallengeImageGroups list={list} imgLink={imgSrc} onSelect={onSelect} />,
    );

    const allImg = await screen.findAllByRole('img');
    allImg.forEach(async (item) => {
      if (item.id === type) expect(item).not.toHaveClass('border-fuchsia-700');
      else {
        await user.click(item);
        expect(item).toHaveClass('border-fuchsia-700');
      }
    });
  });
});

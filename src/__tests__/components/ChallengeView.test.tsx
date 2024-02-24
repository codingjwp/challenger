import ChallengeView from '@/components/ChallengeView';
import {screen, render} from '@testing-library/react';
import {wrapper} from '../exampleRouter';

describe('CahllengeView 컴포넌트', () => {
  const examplePost = [
    {
      postId: '473f8f84-3bc3-4956-babf-bd33991b513e',
      title: '!!!!!!!!!!!!!!! 도전 !!!!!!!!!!!!!!!!!!!!',
      imgSrc: '/assets/cooking.png',
      description: '요리를 해보고 돈을 아껴 보자',
      startDate: '2024-02-20',
      endDate: '2024-02-24',
      status: 'success',
    },
    {
      postId: 'ee07e2cc-5ae5-44a7-bc19-342f81a62156',
      title: '도전입니다.',
      imgSrc: '/assets/pets.png',
      description: '도전입니다.도전입니다.',
      startDate: '2024-02-15',
      endDate: '2024-02-22',
      status: 'challenge',
    },
    {
      postId: '27293f02-caa9-484d-98d7-27980b3e63fc',
      title: 'test',
      imgSrc: '/assets/exercises.jpg',
      description: 'tet',
      startDate: '2024-02-21',
      endDate: '2024-02-29',
      status: 'failure',
    },
  ];
  it('props 전달후 렌더링 테스트', () => {
    render(
      <ChallengeView
        posts={examplePost}
        tabIndex=''
        onModalAction={() => {}}
      />,
      {wrapper},
    );

    const firstTitle = screen.getByText('도전입니다.');
    const secondTitle = screen.getByText('test');
    expect(firstTitle).toBeInTheDocument();
    expect(secondTitle).toBeInTheDocument();

    const diffDay = (start: string, end: string) => {
      const startDate = new Date(start).getTime();
      const endtDate = new Date(end).getTime();
      const newDate = new Date().getTime();
      if (newDate >= endtDate) return 'failed';
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const timeDiff = endtDate - startDate;
      const diffValue = Math.floor(timeDiff / millisecondsPerDay);

      return diffValue > 999
        ? '999+'
        : diffValue < 0
          ? 'failed'
          : String(diffValue);
    };

    examplePost.map(async (post) => {
      const badge = diffDay(post.startDate, post.endDate);
      const badgeElement = await screen.findByText(badge);
      expect(badgeElement).toBeInTheDocument();
    });
  });
});

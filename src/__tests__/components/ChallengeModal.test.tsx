import {screen, render} from '@testing-library/react';
import ChallengeModal from '@/components/modals/ChallengeModal';
import {wrapper} from '../exampleRouter';
import nock from 'nock';

describe('ChallengeModal 컴포넌트', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('props 전달 후 모달 렌더링 테스트', () => {
    const modals = document.createElement('div');
    modals.id = 'modal';
    document.body.appendChild(modals);
    render(<ChallengeModal type='create' onModalAction={() => {}} />, {
      container: modals,
      wrapper,
    });

    const titleText = screen.getByText('도전할 내용을 작성해 주세요.');
    const createText = screen.getByText('생성');
    const closeText = screen.getByText('닫기');
    expect(titleText).toBeInTheDocument();
    expect(createText).toBeInTheDocument();
    expect(closeText).toBeInTheDocument();
  });
});

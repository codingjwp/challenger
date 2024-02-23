import TabItem from '@/components/ui/TabItem';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TabItem 컴포넌트', () => {
  it('props 설정후 렌더링 테스트', async () => {
    let isSelectTabs = false;
    const onSelect = jest.fn(() => (isSelectTabs = !isSelectTabs));

    render(
      <TabItem
        onSelect={onSelect}
        selectCounter={1}
        isSelectTabs={isSelectTabs}
      >
        challenge
      </TabItem>,
    );
    const tabItem = screen.getByText('challenge');
    const counter = screen.getByText('1');
    expect(tabItem).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
  });
  it('onSelect 클릭 이벤트 테스트', async () => {
    const user = userEvent.setup();
    let isSelectTabs = false;
    const onSelect = jest.fn(() => (isSelectTabs = !isSelectTabs));

    render(
      <TabItem
        onSelect={onSelect}
        selectCounter={1}
        isSelectTabs={isSelectTabs}
      >
        challenge
      </TabItem>,
    );

    await user.click(screen.getByText('challenge'));
    // onSelect가 실행되었는지 확인
    expect(onSelect).toHaveBeenCalled();
    // 값이 변경되었는지 확인
    expect(isSelectTabs).toBeTruthy();
  });
});

import Button from '@ui/Button';
import TabItem from '@ui/TabItem';
import Tabs from '@ui/Tabs';

import {TAB_ITEMS} from '@util/viewData';

type ChallengeTabsProps = {
  tabIndex: string;
  counter: {
    challengeLength: number;
    successLength: number;
    failureLength: number;
  };
  onSelect: (index: string) => void;
  onModalAction: (type: string) => void;
};

const ChallengeTabs = ({
  tabIndex,
  onSelect,
  counter,
  onModalAction,
}: ChallengeTabsProps) => {
  return (
    <Tabs className='flex w-full  max-w-3xl mx-auto mt-3'>
      {TAB_ITEMS.map((item) => {
        const tabCounter =
          item.id === 'challenge'
            ? counter.challengeLength
            : item.id === 'success'
              ? counter.successLength
              : counter.failureLength;
        return (
          <TabItem
            key={item.id}
            onSelect={() => onSelect(item.id)}
            selectCounter={tabCounter}
            isSelectTabs={item.id === tabIndex}
          >
            {item.label}
          </TabItem>
        );
      })}
      <Button
        className='min-w-20 mx-1 h-11 bg-red-500 hover:bg-red-600'
        type='button'
        mode='fill'
        onClick={() => onModalAction('create')}
      >
        생성
      </Button>
    </Tabs>
  );
};

export default ChallengeTabs;

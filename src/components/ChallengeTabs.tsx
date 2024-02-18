import Button from '../components/Button';
import TabItem from '../components/TabItem';
import Tabs from '../components/Tabs';

import {TAB_ITEMS} from '../util/viewData';

type ChallengeTabsProps = {
  tabIndex: string;
  counter: {
    challengeLength: number;
    sucessLength: number;
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
    <Tabs className='flex w-full max-w-[90rem] mx-auto mt-3'>
      {TAB_ITEMS.map((item) => {
        const tabCounter =
          item.id === 'challenge'
            ? counter.challengeLength
            : item.id === 'sucess'
              ? counter.sucessLength
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

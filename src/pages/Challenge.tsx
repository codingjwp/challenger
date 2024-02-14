import TabItem from '../components/TabItem';
import Tabs from '../components/Tabs';
import {TAB_ITEMS} from '../util/viewData';
import {useState} from 'react';

const Challenge = () => {
  const [tabIndex, setTabIndex] = useState<string>('challenge');

  const handelTabsClick = (index: string) => {
    setTabIndex(index);
  };

  return (
    <main className='pt-12'>
      <Tabs className='flex w-full max-w-[40rem] mx-auto mt-3'>
        {TAB_ITEMS.map((item) => (
          <TabItem
            key={item.id}
            onSelect={() => handelTabsClick(item.id)}
            selectCounter={0}
            isSelectTabs={item.id === tabIndex}
          >
            {item.label}
          </TabItem>
        ))}
      </Tabs>
      <div className='w-[40rem] my-2 h-10 bg-black mx-auto'></div>
    </main>
  );
};

export default Challenge;

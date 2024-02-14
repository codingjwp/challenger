import {FC, ReactNode} from 'react';
import Button from './Button';

type TabItemProps = {
  children: ReactNode;
  selectCounter: number;
  isSelectTabs: boolean;
  onSelect: () => void;
};

const TabItem: FC<TabItemProps> = ({
  children,
  onSelect,
  selectCounter,
  isSelectTabs,
}) => {
  return (
    <li className=' w-full mx-[2px]'>
      <Button type='button' mode='tab' onClick={onSelect}>
        {children}
        <div className='p-1 w-7 h-7 text-sm bg-orange-600 text-white font-bold'>
          {selectCounter}
        </div>
      </Button>
      {isSelectTabs && <div className='h-1 bg-orange-300'></div>}
    </li>
  );
};

export default TabItem;

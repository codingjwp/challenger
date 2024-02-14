import {FC, ReactNode} from 'react';

type TabsProps = {
  className?: string;
  children: ReactNode;
};

const Tabs: FC<TabsProps> = ({className, children}) => {
  return <menu className={className}>{children}</menu>;
};

export default Tabs;

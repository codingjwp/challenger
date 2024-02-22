import {VIEW_INFO_DATA} from '@util/viewData';
import ScrollViewItem from '@components/ScrollViewItem';
import {useNavigate, redirect} from 'react-router-dom';
import {limitCheckLogin} from '@util/login';

const ScrollView = () => {
  const naviate = useNavigate();

  const handleClickMovePath = () => {
    naviate('signin');
  };
  return (
    <main className='h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory'>
      {VIEW_INFO_DATA.map((item) => {
        const classNames =
          ' w-1/2' +
          (item.id === 'i2'
            ? ' h-1/2 bottom-10 left-5'
            : item.id === 'i3'
              ? ' h-2/3 bottom-5 right-5'
              : ' h-2/3 bottom-5 left-1/2 -translate-x-1/2');

        return (
          <ScrollViewItem
            key={item.id}
            viewId={item.id}
            bgSrc={item.bgImgSrc}
            bgAlt={item.bgDescription}
            siSrc={item.siImgSrc}
            siAlt={item.siDescription}
            viewContent={item.viewContent}
            className={classNames}
            onMovePath={handleClickMovePath}
          />
        );
      })}
    </main>
  );
};

export default ScrollView;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin();
  if (path) return redirect(path);
  return path;
};

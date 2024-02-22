import {Outlet, useLocation} from 'react-router-dom';
import Header from '@components/Header';
import {useGlobalStore} from '@stores/store';
import GlobalModal from '@modals/GlobalModal';

const RootLayout = () => {
  const location = useLocation();
  const {open} = useGlobalStore((state) => state.data);
  return (
    <>
      {open && <GlobalModal />}
      {location.pathname !== '/' && <Header title='Challenger' />}
      <Outlet />
    </>
  );
};

export default RootLayout;

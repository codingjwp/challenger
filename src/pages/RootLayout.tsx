import {Outlet, useLocation} from 'react-router-dom';
import Header from '../components/Header';

const RootLayout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <Header title='Challenger' />}
      <Outlet />
    </>
  );
};

export default RootLayout;

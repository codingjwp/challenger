import {Outlet} from 'react-router-dom';
import Header from '../components/Header';

const RootLayout = () => {
  return (
    <>
      <Header title='Challenger' />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

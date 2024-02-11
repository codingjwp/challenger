import {Outlet} from 'react-router-dom';
import Header from '../components/Header';

const RootLayout = () => {
  return (
    <main>
      <Header title='Challenger' />
      <Outlet />
    </main>
  );
};

export default RootLayout;

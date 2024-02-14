import {createBrowserRouter} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ScrollView, {loader as viewLoader} from './pages/ScrollView';
import Login, {loader as loginLoader} from './pages/Login';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>notfound</div>,
    children: [
      {
        index: true,
        element: <ScrollView />,
        loader: viewLoader,
      },
      {
        path: 'login',
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: 'challenge',
        element: <div>challenge</div>,
      },
      {
        path: 'dashboard',
        element: <div>Dashboard page</div>,
      },
    ],
  },
]);

export default routerConfig;

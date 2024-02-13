import {createBrowserRouter} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ScrollView from './pages/ScrollView';
import Login from './pages/Login';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>notfound</div>,
    children: [
      {
        index: true,
        element: <ScrollView />,
      },
      {
        path: 'login',
        element: <Login />,
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

import {createBrowserRouter} from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ScrollView, {loader as viewLoader} from './pages/ScrollView';
import Login, {loader as loginLoader} from './pages/Login';
import Challenge, {loader as challengeLoader} from './pages/Challenge';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>t</div>,
    children: [
      {
        index: true,
        element: <ScrollView />,
        loader: viewLoader,
      },
      {
        path: 'signin',
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: 'signup',
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: 'challenge',
        element: <Challenge />,
        loader: challengeLoader,
      },
      {
        path: 'dashboard',
        element: <div>Dashboard page</div>,
      },
    ],
  },
]);

export default routerConfig;

import {createBrowserRouter} from 'react-router-dom';
import RootLayout from './pages/RootLayout';

const routerConfig = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>notfound</div>,
    children: [
      {
        index: true,
        element: <div>main</div>,
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

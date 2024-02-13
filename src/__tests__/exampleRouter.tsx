import RootLayout from '../pages/RootLayout';
import ScrollView from '../pages/ScrollView';

export const exampleRouter = [
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
        element: <div>Login Page</div>,
      },
      {
        path: 'challenge',
        element: <div>challenge page</div>,
      },
      {
        path: 'dashboard',
        element: <div>Dashboard page</div>,
      },
    ],
  },
];

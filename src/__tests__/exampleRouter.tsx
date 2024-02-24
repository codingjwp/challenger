import RootLayout from '@pages/RootLayout';
import ScrollView, {loader as viewLoader} from '@pages/ScrollView';
import Login, {loader as loginLoader} from '@pages/Login';
import Challenge, {loader as challengeLoader} from '@pages/Challenge';
import Dashboard, {loader as dashboardLoader} from '@pages/Dashboard';
import Notfound from '@pages/Notfound';
import {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const exampleRouter = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Notfound />,
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
        element: <Dashboard />,
        loader: dashboardLoader,
      },
    ],
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const wrapper = ({children}: {children: ReactNode}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

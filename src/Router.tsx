import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const route = createBrowserRouter([
  {
    path: '/',
    element: <div>main</div>,
    errorElement: <div>notfound</div>,
    children: [
      {
        path: 'challenge',
        element: <div>challenge</div>,
      },
      {
        path: 'dashboard',
        element: <div>dashboard</div>,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={route} />;
};

export default Router;
